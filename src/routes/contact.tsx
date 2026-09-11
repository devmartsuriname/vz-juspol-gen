import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_CONTACT_HTML } from "@/lib/public/template/liviza-contact.html";
import { publicHead } from "@/lib/public/seo";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...publicHead(
      "Contact",
      "Adres, telefoonnummer, e-mailadres en openingstijden van Vreemdelingenzaken.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_CONTACT_HTML} />;
}
