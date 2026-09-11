import { createFileRoute } from "@tanstack/react-router";

import { publicHead } from "@/lib/public/seo";
import { LIVIZA_WIZARD_HTML } from "@/lib/public/template/liviza-wizard.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/aanvraaghulp")({
  head: () => ({
    ...publicHead(
      "Aanvraaghulp",
      "Bereid uw bezoek voor: beantwoord enkele vragen en zie welke dienst, voorwaarden en documenten bij uw situatie horen. U dient hier niets in.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_WIZARD_HTML} />;
}
