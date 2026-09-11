/**
 * /diensten/$categorie — governed content on ported Liviza `visa.html`
 * geometry. Demo CTAs and downloads removed. Images remain Liviza demo assets:
 * TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER.
 */

import { categories, servicesInCategory, type CategorySlug } from "@/content/vz-content";

import {
  categoryImage,
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

const icons = ["passport", "suitcase", "student", "open-book", "test", "placeholder"];

export function buildCategoryHtml(slug: CategorySlug): string {
  const category = categories.find((item) => item.slug === slug)!;
  const records = servicesInCategory(slug);

  const cards = records
    .map(
      (service, index) => `						<div class="col-md-6 col-lg-4">
							<article class="pbminfotech-servicebox-style-2">
								<div class="pbminfotech-post-item">
									<span class="pbminfotech-item-thumbnail">
										<span class="pbminfotech-item-thumbnail-inner">
											<img src="${categoryImage[slug]}" class="img-fluid" width="800" height="535" loading="lazy" alt="">
										</span>
									</span>
									<div class="pbminfotech-box-content">
										<div class="pbminfotech-box-content-inner">
											<div class="pbmit-ihbox-icon">
												<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-${icons[index % icons.length]}"></i>
											</div>
											<div class="pbminfotech-des">
												<h3><a href="/diensten/${slug}/${service.slug}" tabindex="0">${service.title}</a></h3>
												<div class="pbminfotech-service-content">
													<p>${service.summary}</p>
												</div>
												<div class="pbminfotech-box-link pbminfotech-vc_btn3">
													<a class="pbminfotech-vc_general" href="/diensten/${slug}/${service.slug}" tabindex="0">
														<span>Bekijk dienst</span>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</article>
						</div>`,
    )
    .join("\n");

  const switcher = categories
    .map(
      (item) =>
        `											<li${item.slug === slug ? ' class="active"' : ""}><a href="/diensten/${item.slug}">${item.label}</a></li>`,
    )
    .join("\n");

  return `${pageOpen("/diensten")}
${titleBar(category.label, [{ label: "Diensten", href: "/diensten" }, { label: category.label }])}
${contentOpen()}
            <!-- service -->
            <section class="section-lg service-section">
				<div class="container">
					<div class="row">
						<div class="col-12">
							<p class="pb-2">${category.intro}</p>
							<div class="row">
${cards}
							</div>
						</div>
					</div>
				</div>
            </section>
            <!-- service End -->
${contentClose()}
${footer()}
`;
}
