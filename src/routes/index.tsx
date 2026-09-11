import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_HOME_HTML } from "@/lib/public/template/liviza-home.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VZ Juspol Gen" },
      {
        name: "description",
        content:
          "Publieke omgeving van VZ Juspol Gen. De pagina toont een visuele basis; goedgekeurde inhoud volgt.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "VZ Juspol Gen" },
      {
        property: "og:description",
        content:
          "Publieke omgeving van VZ Juspol Gen. De pagina toont een visuele basis; goedgekeurde inhoud volgt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...livizaHead(),
  }),
  component: Index,
});

function Index() {
  return <LivizaTemplatePage html={LIVIZA_HOME_HTML} />;
}
