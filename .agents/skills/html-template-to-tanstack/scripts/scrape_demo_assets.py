#!/usr/bin/env python3
"""Scrape a live demo URL for assets the local public/ folder is missing.

Walks the start page + internal nav links one level deep. Collects:
  - <img src>, <source srcset>
  - inline style="background-image:url(...)"
  - url(...) references inside linked stylesheets
  - <link rel="stylesheet" href>
  - <script src>

Downloads anything matching --paths (e.g. img,css,js,fonts,svg) that the
local --out directory does not already contain. External CDNs are skipped
unless --include-cdn is set.

Usage:
  python scrape_demo_assets.py \
      --url https://demo.example.com/theme/ \
      --out public/ \
      --paths img,css,js,fonts,svg
"""
from __future__ import annotations
import argparse, os, re, sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Install deps first: python -m pip install requests beautifulsoup4", file=sys.stderr)
    sys.exit(2)


def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("--url", required=True)
    p.add_argument("--out", required=True)
    p.add_argument("--paths", default="img,css,js,fonts,svg")
    p.add_argument("--include-cdn", action="store_true")
    p.add_argument("--max-pages", type=int, default=15)
    return p.parse_args()


def same_origin(a: str, b: str) -> bool:
    pa, pb = urlparse(a), urlparse(b)
    return (pa.scheme, pa.netloc) == (pb.scheme, pb.netloc)


def local_target(asset_url: str, base: str, out: Path, allowed_roots: list[str]) -> Path | None:
    parsed = urlparse(asset_url)
    path = parsed.path.lstrip("/")
    if not path: return None
    parts = path.split("/")
    if not any(parts[0].lower() == r.lower() or (len(parts) > 1 and parts[1].lower() == r.lower())
               for r in allowed_roots):
        return None
    return out / path


def download(session, url: str, dest: Path) -> bool:
    if dest.exists(): return False
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        r = session.get(url, timeout=20)
        if r.status_code != 200: return False
        dest.write_bytes(r.content)
        return True
    except Exception:
        return False


def collect_from_html(html: str, base: str) -> tuple[set[str], set[str]]:
    soup = BeautifulSoup(html, "html.parser")
    assets, links = set(), set()
    for t in soup.find_all(["img", "source"]):
        for attr in ("src", "data-src", "srcset", "data-srcset"):
            v = t.get(attr)
            if not v: continue
            for piece in re.split(r"[,\s]+", v):
                if piece and not piece.endswith(("w", "x")):
                    assets.add(urljoin(base, piece))
    for t in soup.find_all(style=True):
        for url in re.findall(r"url\(([^)]+)\)", t["style"]):
            assets.add(urljoin(base, url.strip(" '\"")))
    for t in soup.find_all("link", rel=True):
        if "stylesheet" in t.get("rel", []) and t.get("href"):
            assets.add(urljoin(base, t["href"]))
    for t in soup.find_all("script", src=True):
        assets.add(urljoin(base, t["src"]))
    for a in soup.find_all("a", href=True):
        href = urljoin(base, a["href"])
        if same_origin(href, base):
            links.add(href.split("#")[0])
    return assets, links


def collect_from_css(css_text: str, base: str) -> set[str]:
    return {urljoin(base, u.strip(" '\"")) for u in re.findall(r"url\(([^)]+)\)", css_text)}


def main() -> int:
    args = parse_args()
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    roots = [r.strip() for r in args.paths.split(",") if r.strip()]

    session = requests.Session()
    session.headers["User-Agent"] = "Mozilla/5.0 (TemplatePortBot)"

    seen_pages: set[str] = set()
    queue = [args.url]
    asset_urls: set[str] = set()

    while queue and len(seen_pages) < args.max_pages:
        page = queue.pop(0)
        if page in seen_pages: continue
        seen_pages.add(page)
        try:
            r = session.get(page, timeout=20)
            if r.status_code != 200: continue
        except Exception:
            continue
        page_assets, page_links = collect_from_html(r.text, page)
        asset_urls.update(page_assets)
        for link in page_links:
            if link not in seen_pages and len(seen_pages) + len(queue) < args.max_pages:
                queue.append(link)

    # also crawl CSS files for nested url(...) refs
    css_urls = [u for u in list(asset_urls) if u.lower().split("?")[0].endswith(".css")]
    for cu in css_urls:
        if not (args.include_cdn or same_origin(cu, args.url)): continue
        try:
            r = session.get(cu, timeout=20)
            if r.status_code == 200:
                asset_urls.update(collect_from_css(r.text, cu))
        except Exception:
            pass

    downloaded = skipped = 0
    for url in sorted(asset_urls):
        if not (args.include_cdn or same_origin(url, args.url)):
            continue
        dest = local_target(url, args.url, out, roots)
        if not dest: continue
        if download(session, url, dest): downloaded += 1
        else: skipped += 1

    print(f"pages crawled: {len(seen_pages)}")
    print(f"assets discovered: {len(asset_urls)}")
    print(f"downloaded: {downloaded}  skipped/existing: {skipped}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
