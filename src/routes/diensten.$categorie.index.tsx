import { createFileRoute, notFound } from "@tanstack/react-router";

import { categories, type CategorySlug } from "@/content/vz-content";
import { publicHead } from "@/lib/public/seo";
import { buildCategoryHtml } from "@/lib/public/template/liviza-category.html";
import {
  LivizaTemplatePage,
  livizaHead,
} from "@/lib/public/template/LivizaTemplatePage";

function findCategory(slug: string) {
  return categories.find((item) => item.slug === slug);
}

export const Route = createFileRoute("/diensten/$categorie/")({
  loader: ({ params }) => {
    const category = findCategory(params.categorie);
    if (!category) throw notFound();
    return { label: category.label, intro: category.intro };
  },
  head: ({ loaderData }) => ({
    ...publicHead(
      loaderData ? loaderData.label : "Diensten",
      loaderData ? loaderData.intro : "Overzicht van diensten van Vreemdelingenzaken.",
    ),
    ...livizaHead(),
  }),
  component: Page,
});

function Page() {
  const { categorie } = Route.useParams();
  return <LivizaTemplatePage html={buildCategoryHtml(categorie as CategorySlug)} />;
}
