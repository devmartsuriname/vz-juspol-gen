import { Link } from "@tanstack/react-router";

import { availableItems, legalNav } from "@/lib/public/routes-map";

/**
 * Footer bottom-bar legal links.
 *
 * Legal texts are governed content and are not approved yet, so the routes
 * do not exist and nothing is rendered. No legal claim, copyright holder or
 * institutional line is invented here.
 */
export function LegalLinks() {
  const links = availableItems(legalNav);
  if (links.length === 0) return null;

  return (
    <nav aria-label="Juridische links">
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {links.map((item) => (
          <li key={item.key}>
            <Link to={item.to} className="text-vz-white/75 hover:text-vz-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
