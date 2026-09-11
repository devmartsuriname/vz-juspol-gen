import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_SERVICES_HTML } from "@/lib/public/template/liviza-services.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/diensten/")({
  head: () => ({
    meta: [
      { title: "Diensten — VZ Juspol Gen" },
      { name: "description", content: "Visuele basis van het dienstenoverzicht. Goedgekeurde inhoud volgt." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Diensten — VZ Juspol Gen" },
      { property: "og:description", content: "Visuele basis van het dienstenoverzicht. Goedgekeurde inhoud volgt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_SERVICES_HTML} />;
}
