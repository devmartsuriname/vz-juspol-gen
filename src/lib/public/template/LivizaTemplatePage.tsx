import { useEffect, useRef } from "react";

/**
 * Act 1 (LFB-103A) template wrapper.
 *
 * Renders ported Liviza markup byte-faithfully and re-runs the original
 * template scripts on every mount so jQuery/Swiper plugins re-initialise
 * after client-side navigation.
 */

export const LIVIZA_ASSETS = "/vz-public/liviza/assets";

export const LIVIZA_CSS = [
  "bootstrap.min.css",
  "fontawesome.css",
  "flaticon.css",
  "pbminfotech-base-icons.css",
  "swiper.min.css",
  "magnific-popup.css",
  "shortcode.css",
  "base.css",
  "style.css",
  "responsive.css",
]
  .map((file) => `${LIVIZA_ASSETS}/css/${file}`)
  // Isolated public polish layer, always loaded last.
  .concat(["/vz-public/css/vz-polish.css"]);

export const LIVIZA_JS = [
  "jquery.min.js",
  "popper.min.js",
  "bootstrap.min.js",
  "jquery.waypoints.min.js",
  "jquery.appear.js",
  "numinate.min.js",
  "swiper.min.js",
  "jquery.magnific-popup.min.js",
  "circle-progress.js",
  "scripts.js",
]
  .map((file) => `${LIVIZA_ASSETS}/js/${file}`)
  // Isolated public behaviour: Home/End for Bootstrap tablists, and the
  // preparation-only Aanvraaghulp steps. Neither performs any network call.
  .concat(["/vz-public/js/vz-polish.js", "/vz-public/js/vz-wizard.js"]);

export function livizaHead() {
  // LFB-105 D-004: only the stylesheets are emitted from `head()`. The template
  // scripts used to be emitted here with `defer`, so jQuery/Swiper/Bootstrap ran
  // at DOMContentLoaded and mutated the server markup before React hydrated,
  // producing a hydration mismatch on every template route. The post-mount
  // effect below is now the single script execution path.
  return {
    links: LIVIZA_CSS.map((href) => ({ rel: "stylesheet", href })),
  };
}

type Props = {
  html: string;
};

export function LivizaTemplatePage({ html }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Re-execute the template scripts in source order on every mount.
  useEffect(() => {
    const added: HTMLScriptElement[] = [];

    for (const src of LIVIZA_JS) {
      document
        .querySelectorAll<HTMLScriptElement>(`script[data-liviza="${src}"]`)
        .forEach((node) => node.remove());

      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.dataset.liviza = src;
      document.body.appendChild(script);
      added.push(script);
    }

    return () => {
      added.forEach((script) => script.remove());
    };
  }, []);

  // Neutralise template network actions: demo forms and links to pages that
  // are not ported yet must not navigate or submit.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const onSubmit = (event: Event) => {
      event.preventDefault();
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (href.endsWith(".html")) {
        event.preventDefault();
      }
    };

    root.addEventListener("submit", onSubmit, true);
    root.addEventListener("click", onClick);

    return () => {
      root.removeEventListener("submit", onSubmit, true);
      root.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
