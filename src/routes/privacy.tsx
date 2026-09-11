import { createFileRoute } from "@tanstack/react-router";

import { publicHead } from "@/lib/public/seo";
import { LIVIZA_PRIVACY_HTML } from "@/lib/public/template/liviza-legal.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    ...publicHead(
      "Privacyverklaring",
      "Hoe deze informatieve website van Vreemdelingenzaken omgaat met uw gegevens.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_PRIVACY_HTML} />;
}
