import { createFileRoute } from "@tanstack/react-router";

import { publicHead } from "@/lib/public/seo";
import { LIVIZA_DOCUMENTEN_HTML } from "@/lib/public/template/liviza-documenten.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/documentenlijsten")({
  head: () => ({
    ...publicHead(
      "Documentenlijsten",
      "Officiële documentenlijsten en formulieren van Vreemdelingenzaken.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_DOCUMENTEN_HTML} />;
}
