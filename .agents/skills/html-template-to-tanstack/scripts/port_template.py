#!/usr/bin/env python3
"""Orchestrator: unzip → inventory → copy public assets → extract bodies → emit route stubs.

This is a SCAFFOLD, not a magic wand. Review every emitted route before
relying on it. The agent still owns brand/content decisions in phase 7.

Usage:
  python port_template.py \
      --zip /mnt/user-uploads/theme.zip \
      --project /dev-server \
      --stack tanstack            # or vite
      --route-template path/to/route.tanstack.template.tsx
"""
from __future__ import annotations
import argparse, json, re, shutil, subprocess, sys, zipfile
from pathlib import Path


def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("--zip", required=True)
    p.add_argument("--project", required=True)
    p.add_argument("--stack", choices=["tanstack", "vite"], required=True)
    p.add_argument("--route-template", required=True)
    p.add_argument("--intake-dir", default="/tmp/intake")
    p.add_argument("--public-roots", default="img,Img,css,js,fonts,svg,assets,images")
    return p.parse_args()


def safe_unzip(zip_path: Path, dest: Path) -> Path:
    dest.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path) as zf:
        for info in zf.infolist():
            name = info.filename
            if name.startswith("/") or ".." in Path(name).parts:
                continue
            if "/.git/" in name or name.endswith("/.git"):
                continue
            zf.extract(info, dest)
    # if there's a single top-level dir, return it
    entries = [p for p in dest.iterdir() if not p.name.startswith(".")]
    if len(entries) == 1 and entries[0].is_dir():
        return entries[0]
    return dest


def inventory(root: Path) -> dict:
    pages = sorted(p for p in root.rglob("*.html") if "node_modules" not in p.parts)
    return {
        "pages": [str(p.relative_to(root)) for p in pages],
        "css_count": sum(1 for _ in root.rglob("*.css")),
        "js_count": sum(1 for _ in root.rglob("*.js")),
        "img_count": sum(
            1 for ext in ("jpg", "jpeg", "png", "webp", "gif", "svg")
            for _ in root.rglob(f"*.{ext}")
        ),
        "frameworks": detect_frameworks(root),
    }


def detect_frameworks(root: Path) -> list[str]:
    found = set()
    for css in root.rglob("*.css"):
        n = css.name.lower()
        if "bootstrap" in n: found.add("bootstrap")
        if "swiper" in n: found.add("swiper")
        if n.startswith("aos"): found.add("aos")
    for js in root.rglob("*.js"):
        n = js.name.lower()
        if "jquery" in n: found.add("jquery")
        if "gsap" in n: found.add("gsap")
        if "swiper" in n: found.add("swiper")
    return sorted(found)


def copy_public(root: Path, project: Path, public_roots: list[str]) -> None:
    public = project / "public"
    public.mkdir(exist_ok=True)
    for r in public_roots:
        for src in root.glob(r):
            if not src.is_dir(): continue
            dest = public / r.lower()
            subprocess.run(
                ["rsync", "-a", "--exclude=.git", "--exclude=.git/**",
                 f"{src}/", f"{dest}/"], check=True,
            )


def slugify(name: str) -> str:
    base = Path(name).stem.lower()
    base = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    return base or "page"


def route_path(slug: str) -> str:
    return "/" if slug == "index" else f"/{slug}"


def file_for(slug: str, stack: str, project: Path) -> Path:
    if stack == "tanstack":
        target = project / "src" / "routes" / (f"{slug}.tsx" if slug != "index" else "index.tsx")
    else:
        target = project / "src" / "pages" / f"{slug.capitalize()}.tsx"
    target.parent.mkdir(parents=True, exist_ok=True)
    return target


def extract(html_file: Path, extractor: Path, public_roots: str) -> dict:
    r = subprocess.run(
        [sys.executable, str(extractor), str(html_file),
         "--public-roots", public_roots, "--escape-quote", "double"],
        capture_output=True, text=True, check=True,
    )
    return json.loads(r.stdout)


def main() -> int:
    args = parse_args()
    zip_path = Path(args["zip"] if isinstance(args, dict) else args.zip)
    project = Path(args.project)
    intake = Path(args.intake_dir)
    if intake.exists(): shutil.rmtree(intake)
    template_root = safe_unzip(zip_path, intake)
    inv = inventory(template_root)
    (intake / "INVENTORY.md").write_text(
        "# Inventory\n\n```json\n" + json.dumps(inv, indent=2) + "\n```\n"
    )
    print("INVENTORY:", json.dumps(inv, indent=2))

    public_roots = [r.strip() for r in args.public_roots.split(",") if r.strip()]
    copy_public(template_root, project, public_roots)

    template_src = Path(args.route_template).read_text()
    extractor = Path(__file__).with_name("extract_body.py")

    for rel in inv["pages"]:
        html_file = template_root / rel
        slug = slugify(Path(rel).name)
        # don't auto-emit 404; it should be wired to notFoundComponent manually
        if slug == "404": continue
        try:
            data = extract(html_file, extractor, args.public_roots)
        except subprocess.CalledProcessError as e:
            print(f"SKIP {rel}: {e.stderr}", file=sys.stderr)
            continue

        page_title = data["title"] or f"{slug.title()} Page"
        page_desc = data["description"] or f"{slug.title()} page"
        body_literal = data["body_html_js_literal"]

        out = template_src
        out = out.replace('const BODY_HTML = "";',
                          f'const BODY_HTML = "{body_literal}";')
        out = out.replace("REPLACE_ROUTE_PATH", route_path(slug))
        out = out.replace("REPLACE_PAGE_TITLE", page_title.replace('"', '\\"'))
        out = out.replace("REPLACE_PAGE_DESCRIPTION", page_desc.replace('"', '\\"'))

        target = file_for(slug, args.stack, project)
        target.write_text(out)
        print(f"emitted {target.relative_to(project)} from {rel}")

    print("\nNEXT: review every emitted route. Run phase 3 (assets/css), phase 4 (JS), phase 6 (smoke).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
