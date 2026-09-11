import { Link } from "@tanstack/react-router";

import type { AvailableNavItem } from "@/lib/public/routes-map";

type PublicNavItemProps = {
  item: AvailableNavItem;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

/**
 * A single top-level navigation link.
 *
 * Liviza geometry: uppercase, 15px, weight 600, 1px letter-spacing, 17px
 * horizontal rhythm, full 105px row height on desktop.
 */
export function PublicNavItem({ item, variant = "desktop", onNavigate }: PublicNavItemProps) {
  const base =
    "relative font-vz-heading text-[0.9375rem] font-semibold uppercase tracking-[1px] text-vz-ink transition-colors";

  const className =
    variant === "desktop"
      ? `${base} flex h-vz-nav-row items-center px-vz-nav-item hover:text-vz-primary after:absolute after:inset-x-vz-nav-item after:bottom-[34px] after:h-[2px] after:scale-x-0 after:bg-vz-primary after:transition-transform hover:after:scale-x-100`
      : `${base} block border-b border-vz-hairline py-4 hover:text-vz-primary`;

  return (
    <Link
      to={item.to}
      className={className}
      activeOptions={{ exact: item.to === "/" }}
      activeProps={{ "aria-current": "page", className: `${className} text-vz-primary` }}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}
