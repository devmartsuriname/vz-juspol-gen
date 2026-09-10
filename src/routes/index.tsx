import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devmart — Admin platform" },
      {
        name: "description",
        content:
          "Devmart workspace. The admin backoffice lives at /admin; the public frontend for each project ships from its own template.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <div className="max-w-xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Devmart workspace
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Frontend template goes here.
        </h1>
        <p className="text-sm text-muted-foreground">
          This route is intentionally minimal so any public frontend template
          can slot in cleanly. The admin backoffice (Devmart Admin, ported
          from Darkone) lives on its own subtree with fully isolated CSS and
          JS — nothing leaks between them.
        </p>
      </div>
      <Link
        to="/admin/auth-signin"
        className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Open Devmart Admin →
      </Link>
    </div>
  );
}
