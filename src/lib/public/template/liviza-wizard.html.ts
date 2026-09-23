/**
 * /aanvraaghulp — preparation-only guidance wizard (LFB-104).
 *
 * The wizard is voorbereiding only. It asks two categorical questions and
 * shows the governed information that already exists for the chosen service.
 * It does not collect personal data, free text, uploads or payments, has no
 * account, submits nothing, and reaches no backend. All steps and outcomes
 * are rendered server-side; `/vz-public/js/vz-wizard.js` only toggles
 * visibility and remembers the two categorical choices for 24 hours.
 *
 * Geometry, class names and spacing follow the ported Liviza patterns.
 */

import { categories, documentFor, servicesInCategory } from "@/content/vz-content";

import { contentClose, contentOpen, footer, pageOpen, titleBar } from "./chrome";

const icons = ["passport", "suitcase", "student", "open-book", "test", "placeholder"];

const NOTICE =
  "De aanvraaghulp geeft informatie en helpt u voorbereiden. U dient hier niets in, u maakt geen account aan en er wordt niet om persoonsgegevens gevraagd.";

function choiceCard(
  attr: string,
  value: string,
  icon: string,
  title: string,
  body: string,
): string {
  return `						<div class="col-md-6 col-lg-4">
							<article class="pbminfotech-servicebox-style-2 vz-wizard-choice">
								<div class="pbminfotech-post-item">
									<div class="pbminfotech-box-content">
										<div class="pbminfotech-box-content-inner">
											<div class="pbmit-ihbox-icon">
												<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-${icon}"></i>
											</div>
											<div class="pbminfotech-des">
												<h3>${title}</h3>
												<div class="pbminfotech-service-content">
													<p>${body}</p>
												</div>
												<div class="pbminfotech-box-link pbminfotech-vc_btn3">
													<button type="button" class="pbminfotech-vc_general vz-wizard-btn" ${attr}="${value}" aria-label="Kies ${title}" aria-pressed="false">
														<span>Kies</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</article>
						</div>`;
}

/** Step 1 — categorical question: which kind of aanvraag. */
const step1 = `				<div class="vz-wizard-step" data-vz-step="1">
					<div class="pbmit-heading-subheading">
						<h4 class="pbmit-subtitle">Stap 1 van 3</h4>
						<h2 class="pbmit-title">Waar gaat uw <em>aanvraag</em> over?</h2>
					</div>
					<div class="row">
${categories
  .map((category, index) =>
    choiceCard(
      "data-vz-category",
      category.slug,
      icons[index % icons.length],
      category.label,
      category.intro,
    ),
  )
  .join("\n")}
					</div>
				</div>`;

/** Step 2 — one panel per category, listing that category's services. */
const step2 = categories
  .map((category) => {
    const records = servicesInCategory(category.slug);
    const cards = records
      .map((service, index) =>
        choiceCard(
          "data-vz-service",
          `${category.slug}/${service.slug}`,
          icons[index % icons.length],
          service.title,
          service.summary,
        ),
      )
      .join("\n");

    return `				<div class="vz-wizard-step" data-vz-step="2" data-vz-panel="${category.slug}" hidden>
					<div class="pbmit-heading-subheading">
						<h4 class="pbmit-subtitle">Stap 2 van 3</h4>
						<h2 class="pbmit-title">Welke dienst binnen <em>${category.label}</em>?</h2>
					</div>
					<div class="row">
${cards}
					</div>
					<div class="vz-wizard-actions">
						<button type="button" class="pbmit-btn vz-wizard-back" data-vz-back="1"><span>Vorige stap</span></button>
					</div>
				</div>`;
  })
  .join("\n");

/** Step 3 — one governed result panel per service. */
const step3 = categories
  .flatMap((category) => servicesInCategory(category.slug))
  .map((service) => {
    const category = categories.find((item) => item.slug === service.category)!;
    const doc = documentFor(service);

    const conditions = service.conditions
      .map(
        (condition) => `							<li class="list-group-item">
								<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-check"></i> ${condition}
							</li>`,
      )
      .join("\n");

    const facts: string[] = [];
    if (service.fee) facts.push(`<li><strong>Kosten:</strong> ${service.fee}</li>`);
    if (service.legalBasis)
      facts.push(`<li><strong>Wettelijke grondslag:</strong> ${service.legalBasis}</li>`);
    if (service.processing)
      facts.push(`<li><strong>Doorlooptijd:</strong> ${service.processing}</li>`);

    const docBlock = doc
      ? `						<a class="pbmit-btn" href="/vz-public/documenten/${encodeURIComponent(doc.file)}" target="_blank" rel="noopener"><span>Officiële documentenlijst openen</span></a>`
      : `						<p class="vz-meta">Voor deze dienst is via deze website geen documentenlijst gepubliceerd. Vraag de benodigde documenten na bij Vreemdelingenzaken.</p>`;

    return `				<div class="vz-wizard-step vz-wizard-result" data-vz-step="3" data-vz-result="${service.category}/${service.slug}" hidden>
					<div class="pbmit-heading-subheading">
						<h4 class="pbmit-subtitle">Stap 3 van 3 — uw voorbereiding</h4>
						<h2 class="pbmit-title">${service.title}</h2>
					</div>
					<div class="pbmit-entry-content">
						<p>${service.summary}</p>
						<p>Categorie: <a href="/diensten/${category.slug}">${category.label}</a></p>
						${facts.length ? `<ul class="vz-wizard-facts">${facts.join("")}</ul>` : ""}
						<h3>Belangrijke voorwaarden</h3>
						<ul class="list-group list-group-borderless">
${conditions}
						</ul>
						<h3>Documenten</h3>
						<p>Controleer de actuele vereisten altijd bij Vreemdelingenzaken. Deze uitkomst is geen aanvraag en geen beslissing over uw situatie.</p>
					</div>
					<div class="vz-wizard-actions">
${docBlock}
						<a class="pbmit-btn" href="/diensten/${category.slug}/${service.slug}"><span>Naar de dienstpagina</span></a>
						<a class="pbmit-btn" href="/contact"><span>Naar contact</span></a>
						<button type="button" class="pbmit-btn vz-wizard-back" data-vz-back="2"><span>Vorige stap</span></button>
						<button type="button" class="pbmit-btn vz-wizard-restart"><span>Opnieuw beginnen</span></button>
					</div>
				</div>`;
  })
  .join("\n");

export const LIVIZA_WIZARD_HTML = `${pageOpen("/aanvraaghulp")}
${titleBar("Aanvraaghulp", [{ label: "Aanvraaghulp" }])}
${contentOpen()}
            <!-- Aanvraaghulp -->
            <section class="section-lg">
				<div class="container">
					<p class="vz-note">${NOTICE}</p>
					<div class="vz-wizard" data-vz-wizard>
						<p class="vz-wizard-live" role="status" aria-live="polite"></p>
${step1}
${step2}
${step3}
					</div>
				</div>
            </section>
            <!-- Aanvraaghulp End -->
${contentClose()}
${footer()}
`;
