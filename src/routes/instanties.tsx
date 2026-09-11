import { createFileRoute } from "@tanstack/react-router";

import { publicHead } from "@/lib/public/seo";
import { LIVIZA_INSTANTIES_HTML } from "@/lib/public/template/liviza-instanties.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/instanties")({
  head: () => ({
    ...publicHead(
      "Instanties",
      "Overheidsinstanties die betrokken kunnen zijn bij uw aanvraag of procedure.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_INSTANTIES_HTML} />;
}
