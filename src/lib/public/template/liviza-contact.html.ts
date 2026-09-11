/**
 * /contact — governed content on ported Liviza `contacts.html` geometry.
 * The PHP contact form and the third-party map embed are removed; the block
 * dimensions are preserved by a static "Hoe u ons bereikt" panel.
 */

import { identity } from "@/content/vz-content";

import {
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

function infoCard(icon: string, heading: string, body: string): string {
  return `						<div class="col-md-4">
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

export const LIVIZA_CONTACT_HTML = `${pageOpen("/contact")}
${titleBar("Contact", [{ label: "Contact" }])}
${contentOpen()}
			<!-- Contact -->
			<section class="section-lg">
				<div class="container">
					<div class="row">
${infoCard("placeholder", "Adres", `${identity.unit}<br>${identity.address}`)}
${infoCard("call", "Telefoon", identity.phone)}
${infoCard("envelope", "E-mail", identity.email)}
					</div>
				</div>
			</section>

			<section>
				<div class="container">
					<div class="contact-us-section">
						<div class="row">
							<div class="col-md-6">
								<div class="pbmit-heading-subheading">
									<h4 class="pbmit-subtitle">Openingstijden</h4>
									<h2 class="pbmit-title">Wanneer u <em>terechtkunt</em></h2>
								</div>
								<p>${identity.hours}<br>${identity.hoursClosed}</p>
							</div>
							<div class="col-md-6">
								<div class="pbmit-heading-subheading">
									<h4 class="pbmit-subtitle">Bezoek</h4>
									<h2 class="pbmit-title">Hoe u ons <em>bereikt</em></h2>
								</div>
								<p>${identity.unit}<br>${identity.address}</p>
								<p>Neem telefonisch of per e-mail contact op. Via deze website worden geen persoonsgegevens verzonden en kunt u geen aanvraag indienen.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- Contact End -->
${contentClose()}
${footer()}
`;
