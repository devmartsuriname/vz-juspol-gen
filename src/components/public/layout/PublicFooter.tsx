import { FooterColumn } from "./FooterColumn";
import { LegalLinks } from "./LegalLinks";
import { footerNav } from "@/lib/public/routes-map";

/**
 * Public footer, rebuilt in the Liviza design language at the same widget
 * widths, without the commercial newsletter, social row or contact widget.
 *
 * No address, phone, e-mail, opening hours, mandate or institutional claim is
 * rendered: those records do not exist yet and are truthfully omitted.
 */
export function PublicFooter() {
  const columns = footerNav.filter((column) => column.items.some((item) => item.available));

  return (
    <footer className="mt-auto bg-vz-ink text-vz-white/75">
      <div className="vz-container py-vz-block">
        <div className="grid gap-vz-card-gap md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-vz-heading text-[1.125rem] font-bold uppercase tracking-[1px] text-vz-white">
              VZ Juspol Gen
            </p>
            <p className="mt-4 max-w-[34rem]">
              Publieke informatie- en voorbereidingsomgeving. Deze omgeving is in
              opbouw; onderdelen verschijnen zodra de inhoud is goedgekeurd.
            </p>
          </div>
          {columns.map((column) => (
            <FooterColumn key={column.heading} heading={column.heading} items={column.items} />
          ))}
        </div>
      </div>

      <div className="border-t border-vz-white/15">
        <div className="vz-container flex flex-col gap-3 py-6 text-[0.875rem] md:flex-row md:items-center md:justify-between">
          <p>VZ Juspol Gen — projectaanduiding in ontwikkeling.</p>
          <LegalLinks />
        </div>
      </div>
    </footer>
  );
}
