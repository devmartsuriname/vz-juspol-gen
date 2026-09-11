import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_NEWS_HTML } from "@/lib/public/template/liviza-news.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/nieuws/")({
  head: () => ({
    meta: [
      { title: "Nieuws en mededelingen — VZ Juspol Gen" },
      { name: "description", content: "Visuele basis van het overzicht met nieuws en mededelingen. Goedgekeurde inhoud volgt." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Nieuws en mededelingen — VZ Juspol Gen" },
      { property: "og:description", content: "Visuele basis van het overzicht met nieuws en mededelingen. Goedgekeurde inhoud volgt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_NEWS_HTML} />;
}
