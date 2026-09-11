import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_NEWS_DETAIL_HTML } from "@/lib/public/template/liviza-news-detail.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/nieuws/$slug")({
  head: () => ({
    meta: [
      { title: "Mededeling — VZ Juspol Gen" },
      { name: "description", content: "Visuele basis van een mededelingpagina. Goedgekeurde inhoud volgt." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Mededeling — VZ Juspol Gen" },
      { property: "og:description", content: "Visuele basis van een mededelingpagina. Goedgekeurde inhoud volgt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_NEWS_DETAIL_HTML} />;
}
