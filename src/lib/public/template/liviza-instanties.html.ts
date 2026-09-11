/**
 * /instanties — governed stakeholder roster on ported Liviza inner-page grid
 * geometry. Only the institution name and a concise role line are published;
 * unverified detail is not shown. No third-party logos, links or embeds.
 */

import { STAKEHOLDER_VERIFY_NOTE, stakeholders } from "@/content/vz-content";

import {
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

const cards = stakeholders
  .map(
    (item) => `						<div class="col-md-6 col-lg-4">
							<article class="pbminfotech-servicebox-style-2">
								<div class="pbminfotech-post-item">
									<div class="pbminfotech-box-content">
										<div class="pbminfotech-box-content-inner">
											<div class="pbminfotech-des">
												<h3>${item.name}</h3>
												<div class="pbminfotech-service-content">
													<p>${item.role}</p>
													<p style="font-size:13px;">Gegevens worden bevestigd.</p>
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
            <section class="section-lg service-section">
				<div class="container">
					<p class="pb-2">Overheidsinstanties die betrokken kunnen zijn bij uw aanvraag of procedure.</p>
					<div class="row">
${cards}
					</div>
					<p class="pb-2" style="margin-top:24px;font-size:13px;">${STAKEHOLDER_VERIFY_NOTE}</p>
				</div>
            </section>
            <!-- Stakeholders End -->
${contentClose()}
${footer()}
`;
