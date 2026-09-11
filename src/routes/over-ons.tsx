import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_ABOUT_HTML } from "@/lib/public/template/liviza-about.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    meta: [
      { title: "Over ons — VZ Juspol Gen" },
      { name: "description", content: "Visuele basis van de pagina Over ons. Goedgekeurde inhoud volgt." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Over ons — VZ Juspol Gen" },
      { property: "og:description", content: "Visuele basis van de pagina Over ons. Goedgekeurde inhoud volgt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_ABOUT_HTML} />;
}
