import { Link } from "@tanstack/react-router";

import { availableItems, type PublicNavConfigItem } from "@/lib/public/routes-map";

type FooterColumnProps = {
  heading: string;
  items: readonly PublicNavConfigItem[];
};

/**
 * One footer widget column (Liviza footer widget row).
 *
 * Only links whose route file exists are rendered. When a column has no
 * available link yet, the column is omitted entirely rather than showing dead
 * links or invented text.
 */
export function FooterColumn({ heading, items }: FooterColumnProps) {
  const links = availableItems(items);
  if (links.length === 0) return null;

  return (
    <div>
      <h2 className="font-vz-heading text-[1.125rem] font-semibold uppercase tracking-[1px] text-vz-white">
        {heading}
      </h2>
      <ul className="mt-5 space-y-3">
        {links.map((item) => (
          <li key={item.key}>
            <Link to={item.to} className="text-vz-white/75 hover:text-vz-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
