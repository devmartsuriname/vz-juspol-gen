// Vite-React + React Router DOM route template.
// Register in your <Routes>: <Route path="REPLACE_ROUTE_PATH" element={<Page />} />
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const BODY_HTML = ""; // replace with extractor output

const PAGE_CSS: string[] = [
  "/css/preload.min.css",
  "/css/icomoon.css",
  "/css/libs.min.css",
  // "/css/<page>.min.css",
];

const PAGE_SCRIPTS: string[] = [
  "/js/common.min.js",
  // "/js/<page>.min.js",
];

export default function Page() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    PAGE_CSS.forEach((href) => {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
      links.push(l);
    });

    const scripts: HTMLScriptElement[] = [];
    PAGE_SCRIPTS.forEach((src) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      document.body.appendChild(s);
      scripts.push(s);
    });

    return () => {
      links.forEach((l) => l.remove());
      scripts.forEach((s) => s.remove());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>REPLACE_PAGE_TITLE</title>
        <meta name="description" content="REPLACE_PAGE_DESCRIPTION" />
        <meta property="og:title" content="REPLACE_PAGE_TITLE" />
        <meta property="og:description" content="REPLACE_PAGE_DESCRIPTION" />
      </Helmet>
      <div
        style={{ display: "contents" }}
        dangerouslySetInnerHTML={{ __html: BODY_HTML }}
      />
    </>
  );
}
