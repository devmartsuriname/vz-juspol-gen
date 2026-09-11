import { useEffect, useId, useRef } from "react";

import { PublicNavItem } from "./PublicNavItem";
import type { AvailableNavItem } from "@/lib/public/routes-map";

type MobileNavigationProps = {
  items: readonly AvailableNavItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Accessible mobile navigation disclosure.
 *
 * No dependency, no vendor runtime: a button with aria-expanded/aria-controls
 * toggles a panel. Escape closes it, focus returns to the toggle, and the
 * panel is not rendered while closed so its links stay out of the tab order.
 */
export function MobileNavigation({ items, open, onOpenChange }: MobileNavigationProps) {
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Menu sluiten" : "Menu openen"}
        onClick={() => onOpenChange(!open)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-vz-button border border-vz-hairline text-vz-ink transition-colors hover:border-vz-primary hover:text-vz-primary lg:hidden"
      >
        <span aria-hidden="true" className="relative block h-[14px] w-[22px]">
          <span className="absolute inset-x-0 top-0 h-[2px] bg-current" />
          <span className="absolute inset-x-0 top-[6px] h-[2px] bg-current" />
          <span className="absolute inset-x-0 top-[12px] h-[2px] bg-current" />
        </span>
      </button>

      {open ? (
        <nav
          ref={panelRef}
          id={panelId}
          aria-label="Mobiele navigatie"
          className="absolute inset-x-0 top-full z-40 border-t border-vz-hairline bg-vz-white shadow-vz-card lg:hidden"
        >
          <div className="vz-container py-2">
            {items.map((item) => (
              <PublicNavItem
                key={item.key}
                item={item}
                variant="mobile"
                onNavigate={() => onOpenChange(false)}
              />
            ))}
          </div>
        </nav>
      ) : null}
    </>
  );
}
