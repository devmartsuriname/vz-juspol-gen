/**
 * /documentenlijsten — the 17 provenance-registered institutional PDFs
 * (BCF-04 resolved). The binaries are served byte-identically from
 * /vz-public/documenten/ under their registered filenames. Metadata is
 * rendered as text, separate from the unchanged binary.
 */

import { categories, documents } from "@/content/vz-content";

import {
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

const groups = categories
  .map((category) => {
    const rows = documents.filter((doc) => doc.category === category.slug);
    if (rows.length === 0) return "";

    const items = rows
      .map(
        (doc) => `						<div class="col-md-6 col-lg-4">
							<article class="pbminfotech-servicebox-style-2">
								<div class="pbminfotech-post-item">
									<div class="pbminfotech-box-content">
										<div class="pbminfotech-box-content-inner">
											<div class="pbminfotech-des">
												<h3>${doc.title}</h3>
												<div class="pbminfotech-service-content">
													<p style="font-size:13px;">Bestandsnaam: ${doc.file}<br>Grootte: ${Math.round(doc.bytes / 1024)} kB<br>SHA-256: ${doc.sha256.slice(0, 16)}…<br>Status: geregistreerd brondocument${doc.service ? `<br>Dienst: ${doc.service}` : ""}</p>
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

    return `					<div class="pbmit-heading-subheading">
						<h4 class="pbmit-subtitle">${category.label}</h4>
						<h2 class="pbmit-title">Documenten <em>${category.label.toLowerCase()}</em></h2>
					</div>
					<div class="row">
${items}
					</div>`;
  })
  .filter(Boolean)
  .join("\n");

export const LIVIZA_DOCUMENTEN_HTML = `${pageOpen("/documentenlijsten")}
${titleBar("Documentenlijsten", [{ label: "Documentenlijsten" }])}
${contentOpen()}
            <!-- Documents -->
            <section class="section-lg service-section">
				<div class="container">
					<p class="pb-2">Officiële documenten en formulieren van Vreemdelingenzaken. Deze documenten zijn de officiële brondocumenten en worden ongewijzigd gepubliceerd.</p>
${groups}
				</div>
            </section>
            <!-- Documents End -->
${contentClose()}
${footer()}
`;
