/**
 * /instanties — governed stakeholder roster on the ported Liviza
 * `countries.html` portfolio-box-style-2 card pattern (LFB-103D POLISH 001).
 * Only the institution name and a concise role line are published; unverified
 * detail is not shown. No third-party logos, links or embeds.
 *
 * Card imagery uses Liviza demo assets:
 * TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER.
 */

import { STAKEHOLDER_VERIFY_NOTE, stakeholders } from "@/content/vz-content";

import {
  stakeholderImages,
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

const cards = stakeholders
  .map(
    (item, index) => `						<div class="col-md-6 col-lg-4">
							<article class="pbminfotech-portfoliobox-style-2">
								<div class="pbminfotech-post-item">
									<div class="pbminfotech-featured-wrapper pbminfotech-pbminfotech-portfolio-featured-wrapper">
										<img src="${stakeholderImages[index % stakeholderImages.length]}" class="img-fluid" width="800" height="650" loading="lazy" alt="">
									</div>
									<div class="pbminfotech-box-content">
										<div class="pbminfotech-box-content-inner">
											<div class="pbmit-ihbox-icon">
												<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-placeholder"></i>
											</div>
											<div class="pbminfotech-des">
												<div class="pbminfotech-pf-box-title">
													<h3>${item.name}</h3>
												</div>
												<div class="pbminfotech-portfolio-content">
													<p>${item.role}</p>
													<p class="vz-meta">Gegevens worden bevestigd.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</article>
						</div>`,
  )
  .join("\n");

export const LIVIZA_INSTANTIES_HTML = `${pageOpen("/instanties")}
${titleBar("Instanties", [{ label: "Instanties" }])}
${contentOpen()}
            <!-- Stakeholders -->
            <section class="section-lg">
				<div class="container">
					<p class="pb-2">Overheidsinstanties die betrokken kunnen zijn bij uw aanvraag of procedure.</p>
					<div class="row">
${cards}
					</div>
					<p class="vz-note">${STAKEHOLDER_VERIFY_NOTE}</p>
				</div>
            </section>
            <!-- Stakeholders End -->
${contentClose()}
${footer()}
`;
