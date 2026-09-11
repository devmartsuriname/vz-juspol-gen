import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_SERVICE_DETAIL_HTML } from "@/lib/public/template/liviza-service-detail.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/diensten/$categorie/$slug")({
  head: () => ({
    meta: [
      { title: "Dienst — VZ Juspol Gen" },
      { name: "description", content: "Visuele basis van een dienstpagina. Goedgekeurde inhoud volgt." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Dienst — VZ Juspol Gen" },
      { property: "og:description", content: "Visuele basis van een dienstpagina. Goedgekeurde inhoud volgt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_SERVICE_DETAIL_HTML} />;
}
