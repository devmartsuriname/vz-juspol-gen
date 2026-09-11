import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_SERVICES_HTML } from "@/lib/public/template/liviza-services.html";
import { publicHead } from "@/lib/public/seo";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/diensten/")({
  head: () => ({
    ...publicHead(
      "Diensten",
      "Overzicht van de diensten en categorieën van Vreemdelingenzaken.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_SERVICES_HTML} />;
}
