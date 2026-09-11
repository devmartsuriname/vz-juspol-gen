/**
 * /diensten/$categorie/$slug — governed content on ported Liviza
 * `visa-details.html` geometry. Assessment form, team boxes, pricing and
 * counters removed. Fees and legal bases are shown only where the governed
 * source records them; nothing is estimated.
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

  const facts: string[] = [];
  if (service.fee) {
    facts.push(`<li class="pbmit-contact-address pbmit-base-icon-file"><strong>Kosten</strong><br>${service.fee}</li>`);
  }
  if (service.legalBasis) {
    facts.push(`<li class="pbmit-contact-address pbmit-base-icon-file"><strong>Wettelijke grondslag</strong><br>${service.legalBasis}</li>`);
  }
  if (service.processing) {
    facts.push(`<li class="pbmit-contact-address pbmit-base-icon-clock"><strong>Doorlooptijd</strong><br>${service.processing}</li>`);
  }

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
										<p style="font-size:13px;">Bestandsnaam: ${doc.file}<br>Grootte: ${Math.round(doc.bytes / 1024)} kB<br>SHA-256: ${doc.sha256.slice(0, 16)}…<br>Status: geregistreerd brondocument</p>
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
								<h3>Belangrijke voorwaarden</h3>
								<ul class="list-group list-group-borderless">
${conditions}
								</ul>
								<h3>Documenten</h3>
								<p>Documenten en formulieren zijn verkrijgbaar via het kantoor van Vreemdelingenzaken.${doc ? " De officiële documentenlijst voor deze dienst kunt u hiernaast openen." : ""}</p>
								<p>Controleer de actuele vereisten altijd bij Vreemdelingenzaken. Deze pagina is geen aanvraag en geen beslissing over uw situatie.</p>
							</div>
						</div>
						<div class="col-md-12 col-lg-4">
							<div class="pbmit-sidebar">
								<div class="widget">
									<h3 class="widget-title">Gegevens</h3>
									<ul class="pbmit_contact_widget_wrapper">
										<li class="pbmit-contact-address pbmit-base-icon-file"><strong>Dienstcode</strong><br>${service.id}</li>
										${facts.join("\n\t\t\t\t\t\t\t\t\t\t")}
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
