/**
 * /documentenlijsten — the 17 provenance-registered institutional PDFs
 * (BCF-04 resolved). The binaries are served byte-identically from
 * /vz-public/documenten/ under their registered filenames. Metadata is
 * rendered as text, separate from the unchanged binary.
 *
 * Presentation (LFB-103D POLISH 001): compact accessible category tabs on
 * the Liviza service-box card pattern. One panel per category; every
 * registered PDF link is preserved.
 */

import { categories, documents } from "@/content/vz-content";

import {
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

const populated = categories.filter((category) =>
  documents.some((doc) => doc.category === category.slug),
);

const tabs = populated
  .map(
    (category, index) => `							<button type="button" class="vz-tab" role="tab" id="tab-${category.slug}" aria-controls="panel-${category.slug}" aria-selected="${index === 0 ? "true" : "false"}" tabindex="${index === 0 ? "0" : "-1"}">${category.label}</button>`,
  )
  .join("\n");

const panels = populated
  .map((category, index) => {
    const cards = documents
      .filter((doc) => doc.category === category.slug)
      .map(
        (doc) => `								<div class="col-md-6 col-lg-4">
									<article class="pbminfotech-servicebox-style-2">
										<div class="pbminfotech-post-item">
											<div class="pbminfotech-box-content">
												<div class="pbminfotech-box-content-inner">
													<div class="pbminfotech-des">
														<h3>${doc.title}</h3>
														<div class="pbminfotech-service-content">
															<p class="vz-meta">Bestandsnaam: ${doc.file}<br>Grootte: ${Math.round(doc.bytes / 1024)} kB<br>SHA-256: ${doc.sha256.slice(0, 16)}…<br>Status: geregistreerd brondocument${doc.service ? `<br>Dienst: ${doc.service}` : ""}</p>
														</div>
														<div class="pbminfotech-box-link pbminfotech-vc_btn3">
															<a class="pbminfotech-vc_general" href="/vz-public/documenten/${encodeURIComponent(doc.file)}" target="_blank" rel="noopener">
																<span>Document openen</span>
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

    return `						<div class="vz-tabpanel" role="tabpanel" id="panel-${category.slug}" aria-labelledby="tab-${category.slug}" tabindex="0"${index === 0 ? "" : " hidden"}>
							<div class="pbmit-heading-subheading">
								<h4 class="pbmit-subtitle">${category.label}</h4>
								<h2 class="pbmit-title">Documenten <em>${category.label.toLowerCase()}</em></h2>
							</div>
							<div class="row">
${cards}
							</div>
						</div>`;
  })
  .join("\n");

export const LIVIZA_DOCUMENTEN_HTML = `${pageOpen("/documentenlijsten")}
${titleBar("Documentenlijsten", [{ label: "Documentenlijsten" }])}
${contentOpen()}
            <!-- Documents -->
            <section class="section-lg service-section">
				<div class="container">
					<p class="pb-2">Officiële documenten en formulieren van Vreemdelingenzaken. Deze documenten zijn de officiële brondocumenten en worden ongewijzigd gepubliceerd.</p>
					<div class="vz-tabs" role="tablist" aria-label="Documenten per categorie">
${tabs}
					</div>
					<div class="vz-tabpanels">
${panels}
					</div>
				</div>
            </section>
            <!-- Documents End -->
${contentClose()}
${footer()}
`;
