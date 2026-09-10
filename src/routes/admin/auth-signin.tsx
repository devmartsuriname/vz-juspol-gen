import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "../../lib/admin/AdminPage";
import { adminPageMeta } from "../../lib/admin/pages/meta";
import bodyHtml from "../../lib/admin/pages/auth-signin.html?raw";

const meta = adminPageMeta["authSignin"];

export const Route = createFileRoute("/admin/auth-signin")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthSigninPage,
});

function AuthSigninPage() {
  return (
    <AdminPage
      bodyHtml={bodyHtml}
      bodyClass="authentication-bg"
      pageScripts={[]}
    />
  );
}