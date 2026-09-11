import { createFileRoute, notFound } from "@tanstack/react-router";

import { services } from "@/content/vz-content";
import { publicHead } from "@/lib/public/seo";
import { buildServiceDetailHtml } from "@/lib/public/template/liviza-service-detail.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

function findService(categorie: string, slug: string) {
  return services.find(
    (service) => service.category === categorie && service.slug === slug,
  );
}

export const Route = createFileRoute("/diensten/$categorie/$slug")({
  loader: ({ params }) => {
    const service = findService(params.categorie, params.slug);
    if (!service) throw notFound();
    return { title: service.title, summary: service.summary };
  },
  head: ({ loaderData }) => ({
    ...publicHead(
      loaderData ? loaderData.title : "Dienst",
      loaderData
        ? loaderData.summary
        : "Informatie over een dienst van Vreemdelingenzaken.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  const { categorie, slug } = Route.useParams();
  const service = findService(categorie, slug);
  if (!service) return null;
  return <LivizaTemplatePage html={buildServiceDetailHtml(service)} />;
}
