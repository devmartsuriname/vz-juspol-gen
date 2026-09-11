import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_ABOUT_HTML } from "@/lib/public/template/liviza-about.html";
import { publicHead } from "@/lib/public/seo";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    ...publicHead(
      "Over ons",
      "Over Vreemdelingenzaken, onderdeel van het Ministerie van Justitie en Veiligheid.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_ABOUT_HTML} />;
}
