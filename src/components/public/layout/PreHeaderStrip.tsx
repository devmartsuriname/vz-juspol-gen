/**
 * Thin strip above the header (Liviza `pre-header`).
 *
 * Geometry is kept; the demo phone number, e-mail, social icons and CTA
 * button are dropped. No contact data exists as an approved record, so the
 * contact side is truthfully omitted rather than filled with placeholder
 * text.
 */
export function PreHeaderStrip() {
  return (
    <div className="hidden bg-vz-ink text-vz-white md:block">
      <div className="vz-container flex h-vz-preheader items-center justify-between">
        <p className="text-[0.8125rem] leading-none text-vz-white/80">
          Publieke informatie- en voorbereidingsomgeving
        </p>
        <p className="text-[0.8125rem] uppercase leading-none tracking-[1px] text-vz-white/80">
          Nederlands
        </p>
      </div>
    </div>
  );
}
