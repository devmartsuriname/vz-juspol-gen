import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { MobileNavigation } from "./MobileNavigation";
import { PreHeaderStrip } from "./PreHeaderStrip";
import { PublicNavItem } from "./PublicNavItem";
import { availableItems, primaryNav } from "@/lib/public/routes-map";

/**
 * Public header (Liviza `site-header header-style-1`, rebuilt).
 *
 * Measured geometry preserved: 105px desktop navigation row, logo optical
 * area capped at 50px, 1200px content band with 15px gutters, uppercase
 * navigation rhythm at 17px item spacing.
 *
 * No institutional logo, mandate line or ministry sub-line is rendered:
 * "VZ Juspol Gen" is the approved development/project label only.
 */
export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = availableItems(primaryNav);

  return (
    <header className="relative border-b border-vz-hairline bg-vz-white">
      <PreHeaderStrip />

      <div className="vz-container flex h-vz-nav-row-sm items-center justify-between gap-4 lg:h-vz-nav-row">
        <Link
          to="/"
          className="flex min-w-0 max-h-vz-logo items-center gap-3 text-vz-ink hover:text-vz-ink"
          aria-label="VZ Juspol Gen — naar de startpagina"
        >
          <span
            aria-hidden="true"
            className="grid h-vz-logo w-vz-logo shrink-0 place-items-center rounded-vz-button bg-vz-primary font-vz-heading text-[1.0625rem] font-bold tracking-[1px] text-vz-white"
          >
            VZ
          </span>
          <span className="truncate font-vz-heading text-[1.125rem] font-bold uppercase tracking-[1px]">
            Juspol Gen
          </span>
        </Link>

        <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
          <ul className="flex items-center">
            {items.map((item) => (
              <li key={item.key}>
                <PublicNavItem item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <MobileNavigation items={items} open={mobileOpen} onOpenChange={setMobileOpen} />
      </div>
    </header>
  );
}
