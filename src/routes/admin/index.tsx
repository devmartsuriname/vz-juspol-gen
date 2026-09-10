import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "../../lib/admin/AdminPage";
import { adminPageMeta } from "../../lib/admin/pages/meta";
import bodyHtml from "../../lib/admin/pages/index.html?raw";

const meta = adminPageMeta["index"];

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AdminPage
      bodyHtml={bodyHtml}
      pageScripts={[]}
    />
  );
}