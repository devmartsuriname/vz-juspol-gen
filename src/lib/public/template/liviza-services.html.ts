/**
 * /diensten — governed content on ported Liviza `our-services.html` geometry.
 * Team, counters and pricing removed. Images remain Liviza demo assets:
 * TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER.
 */

import { categories, servicesInCategory } from "@/content/vz-content";

import {
  ASSETS,
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

const icons = ["passport", "suitcase", "student", "open-book", "test", "placeholder"];

const cards = categories
  .map((category, index) => {
    const count = servicesInCategory(category.slug).length;
    const image = `service-0${(index % 3) + 1}.jpg`;
    return `						<div class="col-md-6 col-lg-4">
							<article class="pbminfotech-servicebox-style-2">
								<div class="pbminfotech-post-item">
									<span class="pbminfotech-item-thumbnail">
										<span class="pbminfotech-item-thumbnail-inner">
											<img src="${ASSETS}/images/homepage-1/service/${image}" class="img-fluid" alt="">
										</span>
									</span>
									<div class="pbminfotech-box-content">
										<div class="pbminfotech-box-content-inner">
											<div class="pbmit-ihbox-icon">
												<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-${icons[index % icons.length]}"></i>
											</div>
											<div class="pbminfotech-des">
												<h3><a href="/diensten/${category.slug}" tabindex="0">${category.label}</a></h3>
												<div class="pbminfotech-service-content">
													<p>${category.intro} ${count} ${count === 1 ? "dienst" : "diensten"}.</p>
												</div>
												<div class="pbminfotech-box-link pbminfotech-vc_btn3">
													<a class="pbminfotech-vc_general" href="/diensten/${category.slug}" tabindex="0">
														<span>Bekijk ${category.label.toLowerCase()}</span>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</article>
						</div>`;
  })
  .join("\n");

export const LIVIZA_SERVICES_HTML = `${pageOpen("/diensten")}
${titleBar("Diensten", [{ label: "Diensten" }])}
${contentOpen()}
            <!-- Service -->
            <section class="section-lg service-section">
				<div class="container">
					<div class="pbmit-heading-subheading text-center">
						<h4 class="pbmit-subtitle">Diensten</h4>
						<h2 class="pbmit-title">Kies een <em> categorie</em></h2>
					</div>
					<div class="row">
${cards}
					</div>
				</div>
            </section>
            <!-- Service End -->

			<!-- Preparation Start -->
			<section class="section-lg pbmit-bg-color-light">
				<div class="container">
					<div class="row align-items-center">
						<div class="col-md-12 col-lg-6">
							<div class="pbmit-heading-subheading">
								<h4 class="pbmit-subtitle">Voorbereiding</h4>
								<h2 class="pbmit-title">Bereid uw bezoek <em>goed voor.</em></h2>
							</div>
						</div>
						<div class="col-md-12 col-lg-6">
							<p>Bekijk per dienst welke documenten nodig zijn en open de officiële documentenlijsten.</p>
							<a href="/documentenlijsten" class="pbmit-btn">
								<span>Documentenlijsten</span>
							</a>
						</div>
					</div>
				</div>
			</section>
			<!-- Preparation End -->
${contentClose()}
${footer()}
`;
