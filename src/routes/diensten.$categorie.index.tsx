import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_CATEGORY_HTML } from "@/lib/public/template/liviza-category.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/diensten/$categorie/")({
  head: () => ({
    meta: [
      { title: "Dienstencategorie — VZ Juspol Gen" },
      { name: "description", content: "Visuele basis van een dienstencategorie. Goedgekeurde inhoud volgt." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Dienstencategorie — VZ Juspol Gen" },
      { property: "og:description", content: "Visuele basis van een dienstencategorie. Goedgekeurde inhoud volgt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_CATEGORY_HTML} />;
}
