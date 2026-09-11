import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_CONTACT_HTML } from "@/lib/public/template/liviza-contact.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VZ Juspol Gen" },
      { name: "description", content: "Visuele basis van de contactpagina. Goedgekeurde inhoud volgt." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Contact — VZ Juspol Gen" },
      { property: "og:description", content: "Visuele basis van de contactpagina. Goedgekeurde inhoud volgt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_CONTACT_HTML} />;
}
