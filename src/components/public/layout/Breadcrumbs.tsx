import { Link } from "@tanstack/react-router";

import type { ExistingRoutePath } from "@/lib/public/routes-map";

export type BreadcrumbItem = {
  label: string;
  /** Omit on the current page; only existing routes may be linked. */
  to?: ExistingRoutePath;
};

/**
 * Breadcrumb trail for inner pages (Liviza `.pbmit-breadcrumb`, 16/26).
 * Rendered on the banner, white text with translucent links.
 */
export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Kruimelpad" className="mt-4">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[1rem] leading-[1.625rem]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-x-2">
              {item.to && !isLast ? (
                <Link to={item.to} className="text-vz-white/75 hover:text-vz-white">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-vz-white">
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span aria-hidden="true" className="text-vz-white/50">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
