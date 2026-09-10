#!/usr/bin/env python3
"""Smoke + optional pixel-diff for every ported route.

Captures per-route:
  - local screenshot
  - demo screenshot (if --demo provided)
  - simple diff image (PIL) when both exist
  - console log + non-2xx network requests

Writes a REPORT.md summarizing console errors and 404s per route.

Usage:
  python pixel_diff.py \
      --base http://localhost:8080 \
      --routes /,/about,/services,/contact \
      [--demo https://demo.example.com/theme/] \
      --out /tmp/diff/
"""
from __future__ import annotations
import argparse, asyncio, sys
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Playwright not available in this environment.", file=sys.stderr)
    sys.exit(2)

try:
    from PIL import Image, ImageChops
    HAS_PIL = True
except ImportError:
    HAS_PIL = False


def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("--base", required=True)
    p.add_argument("--routes", required=True, help="comma-separated route paths")
    p.add_argument("--demo", default="")
    p.add_argument("--out", required=True)
    p.add_argument("--viewport-w", type=int, default=1280)
    p.add_argument("--viewport-h", type=int, default=1800)
    return p.parse_args()


def slugify(route: str) -> str:
    s = route.strip("/").replace("/", "_") or "home"
    return s


async def capture(page, url: str, screenshot_path: Path):
    console_msgs, bad_responses = [], []
    page.on("console", lambda m: console_msgs.append(f"[{m.type}] {m.text}"))
    page.on("response", lambda r: r.status >= 400 and bad_responses.append(f"{r.status} {r.url}"))
    try:
        await page.goto(url, wait_until="networkidle", timeout=30000)
    except Exception as e:
        console_msgs.append(f"[goto-error] {e}")
    await page.screenshot(path=str(screenshot_path))
    return console_msgs, bad_responses


def diff_images(a: Path, b: Path, out: Path) -> int | None:
    if not HAS_PIL: return None
    img_a = Image.open(a).convert("RGB")
    img_b = Image.open(b).convert("RGB")
    if img_a.size != img_b.size:
        img_b = img_b.resize(img_a.size)
    d = ImageChops.difference(img_a, img_b)
    d.save(out)
    bbox = d.getbbox()
    if not bbox: return 0
    # rough non-zero pixel count
    return sum(1 for px in d.getdata() if px != (0, 0, 0))


async def main() -> int:
    args = parse_args()
    out = Path(args.out); out.mkdir(parents=True, exist_ok=True)
    routes = [r.strip() for r in args.routes.split(",") if r.strip()]

    report_rows = []

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": args.viewport_w, "height": args.viewport_h})

        for route in routes:
            slug = slugify(route)
            d = out / slug; d.mkdir(exist_ok=True)

            page = await context.new_page()
            local_msgs, local_bad = await capture(page, args.base.rstrip("/") + route, d / "local.png")
            (d / "console.log").write_text("\n".join(local_msgs))
            (d / "network.log").write_text("\n".join(local_bad))
            await page.close()

            demo_diff_pixels = None
            if args.demo:
                page = await context.new_page()
                await capture(page, args.demo.rstrip("/") + route, d / "demo.png")
                await page.close()
                demo_diff_pixels = diff_images(d / "local.png", d / "demo.png", d / "diff.png")

            console_errors = sum(1 for m in local_msgs if m.startswith("[error]") or "goto-error" in m)
            report_rows.append({
                "route": route,
                "console_errors": console_errors,
                "bad_requests": len(local_bad),
                "diff_pixels": demo_diff_pixels,
            })

        await browser.close()

    lines = ["# Pixel-diff / smoke report", "",
             "| route | console errors | 4xx/5xx | diff pixels |",
             "| ----- | -------------- | ------- | ----------- |"]
    for r in report_rows:
        lines.append(f"| {r['route']} | {r['console_errors']} | {r['bad_requests']} | {r['diff_pixels'] if r['diff_pixels'] is not None else '—'} |")
    (out / "REPORT.md").write_text("\n".join(lines) + "\n")
    print((out / "REPORT.md").read_text())
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
