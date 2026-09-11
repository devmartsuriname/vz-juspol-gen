import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_FAQ_HTML } from "@/lib/public/template/liviza-faq.html";
import { publicHead } from "@/lib/public/seo";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/veelgestelde-vragen")({
  head: () => ({
    ...publicHead(
      "Veelgestelde vragen",
      "Antwoorden op vragen over diensten en voorbereiding worden hier gepubliceerd.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_FAQ_HTML} />;
}
