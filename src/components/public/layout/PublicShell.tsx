import type { ReactNode } from "react";

import { PageTitle } from "./PageTitle";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";
import type { BreadcrumbItem } from "./Breadcrumbs";

type PublicShellProps = {
  children: ReactNode;
  /** Renders the inner-page banner with the page h1 and breadcrumb trail. */
  pageTitle?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
};

/**
 * Reusable public page shell: skip link, header, single <main> landmark,
 * optional inner banner, footer. Scoped with `.vz-public` so no public style
 * reaches the isolated /admin subtree.
 */
export function PublicShell({ children, pageTitle, breadcrumbs }: PublicShellProps) {
  return (
    <div className="vz-public flex min-h-dvh flex-col">
      <a
        href="#hoofdinhoud"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-vz-button focus:bg-vz-primary focus:px-4 focus:py-2 focus:text-vz-white"
      >
        Naar hoofdinhoud
      </a>

      <PublicHeader />

      <main id="hoofdinhoud" className="flex-1">
        {pageTitle ? <PageTitle title={pageTitle} breadcrumbs={breadcrumbs} /> : null}
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
