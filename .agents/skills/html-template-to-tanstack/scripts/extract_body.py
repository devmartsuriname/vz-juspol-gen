#!/usr/bin/env python3
"""Extract <body> inner HTML + <head> meta from a source HTML file.

Outputs a JSON document on stdout:
  { "title": "...", "description": "...", "body_html": "..." }

The body_html string is:
  - asset paths rewritten to absolute /... under the chosen public root prefixes
  - safe to embed as a JS double-quoted string literal
  - whitespace-normalized (single-line)

Usage:
  python extract_body.py path/to/page.html \
      [--public-roots img,css,js,fonts,svg,assets] \
      [--source-prefix ./] \
      [--escape-quote double|single]
"""
from __future__ import annotations
import argparse, json, re, sys, html as html_lib
from pathlib import Path

PUBLIC_ROOT_DEFAULT = ["img", "Img", "css", "js", "fonts", "svg", "assets", "images"]


def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("html_file")
    p.add_argument("--public-roots", default=",".join(PUBLIC_ROOT_DEFAULT))
    p.add_argument("--source-prefix", default="")
    p.add_argument("--escape-quote", choices=["double", "single"], default="double")
    return p.parse_args()


def extract_between(src: str, open_tag: str, close_tag: str) -> str:
    m = re.search(rf"<{open_tag}\b[^>]*>(.*?)</{close_tag}>", src, re.DOTALL | re.IGNORECASE)
    return m.group(1) if m else ""


def meta_content(head: str, name_attr: str, name_val: str) -> str:
    m = re.search(
        rf'<meta\s+[^>]*{name_attr}\s*=\s*["\']{re.escape(name_val)}["\'][^>]*content\s*=\s*["\']([^"\']*)["\']',
        head, re.IGNORECASE,
    )
    if m: return m.group(1)
    m = re.search(
        rf'<meta\s+[^>]*content\s*=\s*["\']([^"\']*)["\'][^>]*{name_attr}\s*=\s*["\']{re.escape(name_val)}["\']',
        head, re.IGNORECASE,
    )
    return m.group(1) if m else ""


def absolutize_assets(body: str, public_roots: list[str]) -> str:
    roots = "|".join(re.escape(r) for r in public_roots)
    # src="img/..." href="css/..." → /img/... /css/...
    body = re.sub(
        rf'(src|href)\s*=\s*"(?:\./)?(?:\.\./)*((?:{roots})/[^"]+)"',
        r'\1="/\2"', body,
    )
    body = re.sub(
        rf"(src|href)\s*=\s*'(?:\./)?(?:\.\./)*((?:{roots})/[^']+)'",
        r"\1='/\2'", body,
    )
    # url(img/...) → url(/img/...)
    body = re.sub(
        rf'url\(\s*"?(?:\./)?(?:\.\./)*((?:{roots})/[^")]+)"?\s*\)',
        r'url(/\1)', body,
    )
    return body


def escape_for_js(s: str, quote: str) -> str:
    s = s.replace("\\", "\\\\")
    if quote == "double":
        s = s.replace('"', '\\"')
    else:
        s = s.replace("'", "\\'")
    s = s.replace("\r", "").replace("\n", " ")
    s = re.sub(r"\s{2,}", " ", s)
    return s


def main() -> int:
    args = parse_args()
    src_path = Path(args.html_file)
    src = src_path.read_text(encoding="utf-8", errors="ignore")

    head = extract_between(src, "head", "head")
    body = extract_between(src, "body", "body")
    if not body:
        print(f"ERROR: no <body> in {src_path}", file=sys.stderr)
        return 1

    title_m = re.search(r"<title[^>]*>(.*?)</title>", head, re.DOTALL | re.IGNORECASE)
    title = html_lib.unescape(title_m.group(1).strip()) if title_m else ""
    description = meta_content(head, "name", "description")

    roots = [r.strip() for r in args.public_roots.split(",") if r.strip()]
    body = absolutize_assets(body, roots)
    body = body.strip()

    out = {
        "title": title,
        "description": description,
        "body_html": body,
        "body_html_js_literal": escape_for_js(body, args.escape_quote),
        "quote": args.escape_quote,
    }
    print(json.dumps(out, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
