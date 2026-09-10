// Minimal __root.tsx for HTML-template ports.
// KEY DECISION: Tailwind v4 preflight resets header/list styling and visibly
// breaks Bootstrap-based templates ("double header" — nav wraps onto a 2nd line).
// The template's own CSS owns all styling; do NOT import styles.css here.
//
// If the user later wants Tailwind utilities back, re-enable styles.css with
// preflight disabled via @layer base overrides — not by uncommenting blindly.
// import appCss from "../styles.css?url";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      // { rel: "stylesheet", href: appCss }, // intentionally disabled — see comment above
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
