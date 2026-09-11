import { createFileRoute } from "@tanstack/react-router";

import { LIVIZA_NEWS_DETAIL_HTML } from "@/lib/public/template/liviza-news-detail.html";
import { publicHead } from "@/lib/public/seo";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

export const Route = createFileRoute("/nieuws/$slug")({
  head: () => ({
    ...publicHead(
      "Mededeling",
      "Officiële mededeling van Vreemdelingenzaken.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  return <LivizaTemplatePage html={LIVIZA_NEWS_DETAIL_HTML} />;
}
