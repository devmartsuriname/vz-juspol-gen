/**
 * /diensten/$categorie/$slug — governed content on ported Liviza
 * `visa-details.html` geometry (LFB-103D POLISH 001): detail hierarchy with
 * left content column, information widgets, checklist, PDF panel, related
 * services and a preparation callout on the Liviza sidebar pattern.
 *
 * Assessment form, team boxes, pricing tables, sharing and counters are
 * removed. Fees and legal bases are shown only where the governed source
 * records them; nothing is estimated.
 */

import {
  categories,
  documentFor,
  servicesInCategory,
  type ServiceRecord,
} from "@/content/vz-content";

import {
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

function factCard(icon: string, heading: string, body: string): string {
  return `							<div class="col-md-6 col-lg-4">
								<div class="pbminfotech-ihbox pbminfotech-ihbox-style-2">
									<div class="pbminfotech-ihbox-inner">
										<div class="pbminfotech-ihbox-icon">
											<div class="pbminfotech-ihbox-icon-wrapper">
												<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-${icon}"></i>
											</div>
										</div>
										<div class="pbminfotech-ihbox-contents">
											<div class="pbminfotech-vc_general pbminfotech-vc_cta3">
												<div class="pbminfotech-vc_cta3_content-container">
													<div class="pbminfotech-vc_cta3-content">
														<div class="pbminfotech-vc_cta3-content-header pbminfotech-wrap">
															<div class="pbminfotech-vc_cta3-headers pbminfotech-wrap-cell">
																<h2 class="pbminfotech-custom-heading ">${heading}</h2>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="pbminfotech-cta3-content-wrapper">${body}</div>
										</div>
									</div>
								</div>
							</div>`;
}

export function buildServiceDetailHtml(service: ServiceRecord): string {
  const category = categories.find((item) => item.slug === service.category)!;
  const doc = documentFor(service);

  const conditions = service.conditions
    .map(
      (condition) => `									<li class="list-group-item">
										<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-check"></i> ${condition}
									</li>`,
    )
    .join("\n");

  const factCards: string[] = [];
  if (service.fee) factCards.push(factCard("file", "Kosten", service.fee));
  if (service.legalBasis)
    factCards.push(factCard("open-book", "Wettelijke grondslag", service.legalBasis));
  if (service.processing)
    factCards.push(factCard("test", "Doorlooptijd", service.processing));

  const related = servicesInCategory(service.category)
    .filter((item) => item.id !== service.id)
    .map(
      (item) =>
        `											<li><a href="/diensten/${item.category}/${item.slug}">${item.title}</a></li>`,
    )
    .join("\n");

  const documentBlock = doc
    ? `								<div class="widget">
									<h3 class="widget-title">Officieel document</h3>
									<div class="textwidget">
										<p>${doc.title}</p>
										<p class="vz-meta">Bestandsnaam: ${doc.file}<br>Grootte: ${Math.round(doc.bytes / 1024)} kB<br>SHA-256: ${doc.sha256.slice(0, 16)}…<br>Status: geregistreerd brondocument</p>
										<a class="pbmit-btn" href="/vz-public/documenten/${encodeURIComponent(doc.file)}" target="_blank" rel="noopener">
											<span>Document openen</span>
										</a>
									</div>
								</div>`
    : "";

  return `${pageOpen("/diensten")}
${titleBar(service.title, [
  { label: "Diensten", href: "/diensten" },
  { label: category.label, href: `/diensten/${category.slug}` },
  { label: service.title },
])}
${contentOpen()}
            <!-- Service Details -->
            <section class="section-lg">
				<div class="container">
					<div class="row">
						<div class="col-md-12 col-lg-8">
							<div class="pbmit-entry-content">
								<h3>${service.title}</h3>
								<p>${service.summary}</p>
							</div>
							${
                factCards.length
                  ? `<div class="row">
${factCards.join("\n")}
							</div>`
                  : ""
              }
							<div class="pbmit-entry-content">
								<h3>Belangrijke voorwaarden</h3>
								<ul class="list-group list-group-borderless">
${conditions}
								</ul>
								<h3>Documenten</h3>
								<p>Documenten en formulieren zijn verkrijgbaar via het kantoor van Vreemdelingenzaken.${doc ? " De officiële documentenlijst voor deze dienst kunt u hiernaast openen." : ""}</p>
								<p>Controleer de actuele vereisten altijd bij Vreemdelingenzaken. Deze pagina is geen aanvraag en geen beslissing over uw situatie.</p>
							</div>
							<div class="assessment-one">
								<div class="row g-0">
									<div class="col-md-5">
										<div class="assessment-one-img"></div>
									</div>
									<div class="col-md-7">
										<div class="assessment-one-content">
											<h3>Uw bezoek voorbereiden</h3>
											<p>Neem de voorwaarden en de documentenlijst door voordat u naar Vreemdelingenzaken gaat. U dient via deze website niets in.</p>
											<a href="/documentenlijsten" class="pbmit-btn">
												<span>Documentenlijsten</span>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-4">
							<div class="pbmit-sidebar vz-sidebar">
								<div class="widget">
									<h3 class="widget-title">Gegevens</h3>
									<ul class="pbmit_contact_widget_wrapper">
										<li class="pbmit-contact-address pbmit-base-icon-file"><strong>Dienstcode</strong><br>${service.id}</li>
										<li class="pbmit-contact-address pbmit-base-icon-file"><strong>Categorie</strong><br><a href="/diensten/${category.slug}">${category.label}</a></li>
									</ul>
								</div>
${documentBlock}
								${
                  related
                    ? `<div class="widget">
									<h3 class="widget-title">Andere diensten in ${category.label}</h3>
									<div class="menu-visa">
										<ul>
${related}
										</ul>
									</div>
								</div>`
                    : ""
                }
								<div class="widget">
									<h3 class="widget-title">Contact</h3>
									<div class="textwidget">
										<p>Vragen over deze dienst? Neem contact op met Vreemdelingenzaken.</p>
										<a class="pbmit-btn" href="/contact"><span>Naar contact</span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
            </section>
            <!-- Service Details End -->
${contentClose()}
${footer()}
`;
}
