/**
 * /over-ons — governed content on ported Liviza `about-us.html` geometry.
 * Counters, team and testimonials removed. Images remain Liviza demo assets:
 * TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER.
 */

import {
  VZ_IMAGES,
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

export const LIVIZA_ABOUT_HTML = `${pageOpen("/over-ons")}
${titleBar("Over ons", [{ label: "Over ons" }])}
${contentOpen()}
		<!-- About Start -->
		<section class="section-lg">
			<div class="container">
				<div class="row">
					<div class="col-md-12 col-lg-6">
						<div class="about-agency-img">
							<img src="${VZ_IMAGES}/about/vz-about-01.webp" class="img-fluid" width="530" height="540" alt="">
						</div>
					</div>
					<div class="col-md-12 col-lg-6">
						<div class="about-agency-right">
							<div class="pbmit-heading-subheading">
								<h4 class="pbmit-subtitle">Over ons</h4>
								<h2 class="pbmit-title">Vreemdelingenzaken <br> <em>publieke informatie</em></h2>
							</div>
							<h3>Vreemdelingenzaken is onderdeel van het Ministerie van Justitie en Veiligheid.</h3>
							<p>Aanvullende informatie over de organisatie wordt bevestigd.</p>
							<ul class="list-group list-group-borderless">
								<li class="list-group-item">
									<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-check"></i> Deze website geeft informatie en ondersteunt uw voorbereiding
								</li>
								<li class="list-group-item">
									<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-check"></i> U kunt hier geen officiële aanvraag indienen
								</li>
							</ul>
							<a href="/diensten" class="pbmit-btn pbmit-btn-global">
								<span>Bekijk diensten</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- About End -->

		<!-- Practical Start -->
		<section class="section-lg pbmit-bg-color-light">
			<div class="container">
				<div class="row">
					<div class="col-md-12 col-lg-6">
						<div class="pbmit-heading-subheading">
							<h4 class="pbmit-subtitle">Bezoek</h4>
							<h2 class="pbmit-title">Waar u ons <em>vindt</em></h2>
						</div>
						<p>Afgifte Unit, oud Parket Gebouw<br>Henck Arronstraat no. 1, Paramaribo</p>
					</div>
					<div class="col-md-12 col-lg-6">
						<div class="pbmit-heading-subheading">
							<h4 class="pbmit-subtitle">Openingstijden</h4>
							<h2 class="pbmit-title">Wanneer u <em>terechtkunt</em></h2>
						</div>
						<p>Maandag t/m donderdag 07:30–13:30<br>Vrijdag gesloten</p>
					</div>
				</div>
			</div>
		</section>
		<!-- Practical End -->
${contentClose()}
${footer()}
`;
