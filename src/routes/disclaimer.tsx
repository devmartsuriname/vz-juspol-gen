import { createFileRoute } from "@tanstack/react-router";

import { publicHead } from "@/lib/public/seo";
import { LIVIZA_DISCLAIMER_HTML } from "@/lib/public/template/liviza-legal.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    ...publicHead(
      "Disclaimer",
      "Deze website geeft informatie en ondersteunt uw voorbereiding op een aanvraag.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_DISCLAIMER_HTML} />;
}
