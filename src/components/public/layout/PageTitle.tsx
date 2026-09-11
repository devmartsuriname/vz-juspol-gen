import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

type PageTitleProps = {
  title: string;
  breadcrumbs?: readonly BreadcrumbItem[];
};

/**
 * Inner-page banner foundation (Liviza `.pbmit-title-bar-wrapper`).
 *
 * The source uses a background photograph with a dark `:before` overlay. No
 * approved image exists, so the banner ships as the flat overlay colour only
 * (deviation D-102-1). The h1 for the page lives here.
 */
export function PageTitle({ title, breadcrumbs = [] }: PageTitleProps) {
  return (
    <section className="bg-vz-ink py-vz-banner-sm md:py-vz-banner">
      <div className="vz-container">
        <h1 className="text-vz-white">{title}</h1>
        <Breadcrumbs items={breadcrumbs} />
      </div>
    </section>
  );
}
