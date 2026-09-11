import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_HOME_HTML } from "@/lib/public/template/liviza-home.html";
import { publicHead } from "@/lib/public/seo";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/")({
  head: () => ({
    ...publicHead(
      "Home",
      "Informatie en voorbereiding voor aanvragen bij Vreemdelingenzaken, Ministerie van Justitie en Veiligheid.",
    ),
    ...livizaHead(),
  }),
  component: Index,
});

function Index() {
  return <LivizaTemplatePage html={LIVIZA_HOME_HTML} />;
}
