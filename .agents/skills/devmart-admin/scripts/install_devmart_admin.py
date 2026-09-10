#!/usr/bin/env python3
"""
Devmart Admin installer.

Copies the bundled admin shell into a TanStack Start project:
  - public/admin/assets/*            (Darkone vendor bundle)
  - src/routes/admin.tsx             (layout route + CSS isolation)
  - src/routes/admin/index.tsx       (Dashboard route)
  - src/lib/admin/*.tsx / *.ts       (AdminPage + React wrappers + loader)
  - src/lib/admin/pages/index.html   (trimmed dashboard shell)
  - src/lib/admin/pages/meta.ts      (page metadata registry)

Idempotent. Skips files that already exist unless --force is passed.
Run from the project root:

    python3 .agents/skills/devmart-admin/scripts/install_devmart_admin.py
"""
from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path

SKILL_ROOT = Path(__file__).resolve().parent.parent
ASSETS = SKILL_ROOT / "assets"

# (source_relative_to_assets, destination_relative_to_project)
COPIES: list[tuple[str, str]] = [
    # Full vendor bundle (directory copy).
    ("public-admin", "public/admin"),
    # Layout + route.
    ("src-templates/routes/admin.tsx", "src/routes/admin.tsx"),
    ("src-templates/routes/admin/index.tsx", "src/routes/admin/index.tsx"),
    # Wrapper library.
    ("src-templates/lib-admin/AdminPage.tsx", "src/lib/admin/AdminPage.tsx"),
    ("src-templates/lib-admin/AdminChart.tsx", "src/lib/admin/AdminChart.tsx"),
    ("src-templates/lib-admin/AdminTable.tsx", "src/lib/admin/AdminTable.tsx"),
    ("src-templates/lib-admin/AdminDatepicker.tsx", "src/lib/admin/AdminDatepicker.tsx"),
    ("src-templates/lib-admin/AdminScroll.tsx", "src/lib/admin/AdminScroll.tsx"),
    ("src-templates/lib-admin/loadVendor.ts", "src/lib/admin/loadVendor.ts"),
    ("src-templates/lib-admin/index.ts", "src/lib/admin/index.ts"),
    # Dashboard shell HTML + meta.
    ("src-templates/lib-admin-pages/index.html", "src/lib/admin/pages/index.html"),
    ("src-templates/lib-admin-pages/meta.ts", "src/lib/admin/pages/meta.ts"),
]


def copy_path(src: Path, dst: Path, force: bool) -> str:
    if dst.exists() and not force:
        return f"skip   {dst} (exists)"
    dst.parent.mkdir(parents=True, exist_ok=True)
    if src.is_dir():
        if dst.exists():
            shutil.rmtree(dst)
        shutil.copytree(src, dst)
    else:
        shutil.copy2(src, dst)
    return f"write  {dst}"


def main() -> int:
    parser = argparse.ArgumentParser(description="Install Devmart Admin shell.")
    parser.add_argument("--force", action="store_true", help="overwrite existing files")
    parser.add_argument(
        "--project-root",
        default=".",
        help="target project root (default: current directory)",
    )
    args = parser.parse_args()

    project = Path(args.project_root).resolve()
    if not (project / "package.json").exists():
        print(f"error: {project} does not look like a project root (no package.json)", file=sys.stderr)
        return 1

    print(f"Installing Devmart Admin into {project}")
    print(f"Source bundle: {ASSETS}")
    print()

    for src_rel, dst_rel in COPIES:
        src = ASSETS / src_rel
        dst = project / dst_rel
        if not src.exists():
            print(f"error: bundled source missing: {src}", file=sys.stderr)
            return 1
        print(copy_path(src, dst, args.force))

    print()
    print("Done. Next steps:")
    print("  1. Restart the Vite dev server (route tree regenerates).")
    print("  2. Open /admin — should render the placeholder Dashboard.")
    print("  3. Verify CSS isolation:")
    print("       curl -s http://localhost:8080/ | grep -c admin/assets  # -> 0")
    print("  4. Read .agents/skills/devmart-admin/references/working-guide.md")
    return 0


if __name__ == "__main__":
    sys.exit(main())