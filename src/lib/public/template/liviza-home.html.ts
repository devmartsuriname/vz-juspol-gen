/**
 * Homepage markup (LFB-103D governed content swap).
 *
 * Structure, class names and nesting are the ported Liviza `index.html`
 * geometry from LFB-103A. Content is governed VZ content. Testimonials,
 * counters, newsletter, social links, country sales blocks and commercial
 * claims are removed. Images remain Liviza demo assets:
 * TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER.
 */

import { services, stakeholders } from "@/content/vz-content";

import {
  ASSETS,
  contentClose,
  contentOpen,
  footer,
  homeHeader,
} from "./chrome";

const serviceIcons = [
  "passport",
  "suitcase",
  "student",
  "open-book",
  "test",
  "placeholder",
];

const serviceSlides = services
  .map((service, index) => {
    const icon = serviceIcons[index % serviceIcons.length];
    return `							<div class="swiper-slide">
								<article class="pbminfotech-servicebox-style-1">
									<div class="pbminfotech-post-item">
										<div class="pbminfotech-box-content">
											<div class="pbminfotech-box-content-inner">
												<div class="pbminfotech-pf-box-title">
													<div class="pbminfotech-head">
														<h3><a href="/diensten/${service.category}/${service.slug}" tabindex="0">${service.title}</a></h3>
													</div>
												</div>
												<div class="pbmit-ihbox-icon">
													<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-${icon}"></i>
												</div>
												<div class="pbminfotech-des">
													<div class="pbminfotech-service-content">
														<p>${service.summary}</p>
													</div>
												</div>
												<a href="/diensten/${service.category}/${service.slug}" class="pbmit-service-link" tabindex="-1" aria-hidden="true"></a>
											</div>
										</div>
									</div>
								</article>
							</div>`;
  })
  .join("\n");

/**
 * Stakeholder slides on the Liviza `countries.html` portfolio-box-style-2
 * card pattern, presented in the Liviza carousel (4 desktop / 2 tablet /
 * 1 mobile, autoplay off).
 * Images remain Liviza demo assets:
 * TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER.
 */
const stakeholderSlides = stakeholders
  .map(
    (item, index) => `							<div class="swiper-slide">
								<article class="pbminfotech-portfoliobox-style-2">
									<div class="pbminfotech-post-item">
										<div class="pbminfotech-featured-wrapper pbminfotech-pbminfotech-portfolio-featured-wrapper">
											<img src="${ASSETS}/images/homepage-1/portfolio/portfolio-0${(index % 4) + 1}.jpg" class="img-fluid" alt="">
										</div>
										<div class="pbminfotech-box-content">
											<div class="pbminfotech-box-content-inner">
												<div class="pbmit-ihbox-icon">
													<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-placeholder"></i>
												</div>
												<div class="pbminfotech-des">
													<div class="pbminfotech-pf-box-title">
														<h3><a href="/instanties">${item.name}</a></h3>
													</div>
													<div class="pbminfotech-portfolio-content">
														<p>${item.role}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</article>
							</div>`,
  )
  .join("\n");

export const LIVIZA_HOME_HTML = `
	<!-- page wrapper -->
	<div class="page-wrapper">
${homeHeader()}
${contentOpen("demo-one")}
            <!-- Icon Box Start -->
			<section class="pbmit-bg-color-light iconbox-section-one">
				<div class="container">
					<div class="row">
						<div class="col-md-4">
							<div class="pbminfotech-ihbox-style-3">
								<div class="pbminfotech-ihbox-inner">
								   	<div class="pbminfotech-ihbox-table">
										<div class="pbminfotech-ihbox-icon  pbminfotech-icon-skincolor">
											<div class="pbminfotech-ihbox-icon-wrapper">
												<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-open-book"></i>
											</div>
										</div>
										<div class="pbminfotech-vc_general">
											<div class="pbminfotech-vc_cta3_content-container">
												<div class="pbminfotech-vc_cta3-content">
													<div class="pbminfotech-vc_cta3-content-header pbminfotech-wrap">
														<div class="pbminfotech-vc_cta3-headers pbminfotech-wrap-cell">
															<h2 class="pbminfotech-custom-heading "><a href="/diensten">Diensten bekijken</a></h2>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="pbminfotech-ihbox-contents">
										<div class="pbminfotech-cta3-content-wrapper">Bekijk welke diensten er zijn en wat u nodig heeft.</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="pbminfotech-ihbox-style-3 pbmit-col-bgcolor-darkgrey">
								<div class="pbminfotech-ihbox-inner">
								   <div class="pbminfotech-ihbox-table">
										<div class="pbminfotech-ihbox-icon  pbminfotech-icon-skincolor">
											<div class="pbminfotech-ihbox-icon-wrapper">
												<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-test"></i>
											</div>
										</div>
										<div class="pbminfotech-vc_general">
											<div class="pbminfotech-vc_cta3_content-container">
												<div class="pbminfotech-vc_cta3-content">
													<div class="pbminfotech-vc_cta3-content-header pbminfotech-wrap">
														<div class="pbminfotech-vc_cta3-headers pbminfotech-wrap-cell">
															<h2 class="pbminfotech-custom-heading">Aanvraaghulp gebruiken</h2>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="pbminfotech-ihbox-contents">
										<div class="pbminfotech-cta3-content-wrapper">De aanvraaghulp helpt u voorbereiden. U dient hier niets in.</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="pbminfotech-ihbox-style-3 pbmit-col-bgcolor-white">
								<div class="pbminfotech-ihbox-inner">
								   	<div class="pbminfotech-ihbox-table">
										<div class="pbminfotech-ihbox-icon  pbminfotech-icon-skincolor">
											<div class="pbminfotech-ihbox-icon-wrapper">
												<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-student"></i>
											</div>
										</div>
										<div class="pbminfotech-vc_general">
											<div class="pbminfotech-vc_cta3_content-container">
												<div class="pbminfotech-vc_cta3-content">
												<div class="pbminfotech-vc_cta3-content-header pbminfotech-wrap">
													<div class="pbminfotech-vc_cta3-headers pbminfotech-wrap-cell">
														<h2 class="pbminfotech-custom-heading "><a href="/documentenlijsten">Documentenlijsten</a></h2>
													</div>
												</div>
												</div>
											</div>
										</div>
									</div>
									<div class="pbminfotech-ihbox-contents">
										<div class="pbminfotech-cta3-content-wrapper">Officiële documenten en formulieren van Vreemdelingenzaken.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="iconbox-one-content">
						<div class="row align-items-center">
							<div class="col-md-6">
								<div class="pbmit-heading-subheading">
									<h4 class="pbmit-subtitle">Publieke dienstverlening</h4>
									<h2 class="pbmit-title">Waarmee kunnen wij<br><em> u helpen?</em></h2>
								</div>
							</div>
							<div class="col-md-6">
								<p>U krijgt uitleg over stappen, documenten en waar u terechtkunt. Deze website geeft informatie en ondersteunt uw voorbereiding.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
            <!-- Icon Box End -->

            <!-- About Start -->
            <section class="section-md">
				<div class="container">
					<div class="row">
						<div class="col-md-12 col-lg-6">
							<div class="about-one-left">
								<div class="about-img-one">
									<img src="${ASSETS}/images/homepage-1/img-01.jpg" class="img-fluid" alt="">
								</div>
								<div class="about-img-two">
									<img src="${ASSETS}/images/homepage-1/img-02.jpg" class="img-fluid" alt="">
								</div>
								<div class="about-one-iconbox">
									<div class="about-one-icon">
										<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-student"></i>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-6">
							<div class="about-one-right">
								<div class="pbmit-heading-subheading">
									<h4 class="pbmit-subtitle">Over Vreemdelingenzaken</h4>
									<h2 class="pbmit-title">Informatie en<br><em> voorbereiding.</em></h2>
								</div>
								<h3>Vreemdelingenzaken is onderdeel van het Ministerie van Justitie en Veiligheid.</h3>
								<p>Deze website geeft informatie over diensten, documenten en voorbereiding. U kunt hier geen officiële aanvraag indienen en er wordt geen beslissing over uw situatie genomen.</p>
								<ul class="list-group list-group-borderless">
									<li class="list-group-item">
										<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-check"></i> Bekijk per dienst welke documenten nodig zijn
									</li>
									<li class="list-group-item">
										<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-check"></i> Open de officiële documentenlijsten
									</li>
									<li class="list-group-item">
										<i class="pbmit-liviza-business-icon pbmit-liviza-business-icon-check"></i> Controleer de actuele vereisten bij Vreemdelingenzaken
									</li>
								</ul>
								<a href="/over-ons" class="pbmit-btn">
									<span>Over ons</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
            <!-- About End -->

            <!-- Service Start -->
            <section class="section-lgx service-one-bg pbmit-bg-color-blackish">
				<div class="container">
					<div class="row align-items-center">
						<div class="col-md-6">
							<div class="pbmit-heading-subheading">
								<h4 class="pbmit-subtitle">Diensten</h4>
								<h2 class="pbmit-title text-white">Diensten van<br><em> Vreemdelingenzaken</em></h2>
							</div>
						</div>
						<div class="col-md-6">
							<p>Bekijk per dienst de vereisten, de documenten en de kosten zoals die in de officiële bron zijn vastgelegd.</p>
						</div>
					</div>
					<div class="swiper-slider swiper-btn-right-dots vz-equal-slides" data-loop="false" data-autoplay="false" data-dots="true" data-arrows="false"  data-columns="4" data-margin="30" data-effect="slide">
						<div class="swiper-wrapper">
${serviceSlides}
						</div>
					</div>
				</div>
			</section>
            <!-- Service End -->

			<!-- Guidance Start -->
            <section>
				<div class="container">
					<div class="assessment-one">
						<div class="row g-0">
							<div class="col-md-5">
								<div class="assessment-one-img"></div>
							</div>
							<div class="col-md-7">
								<div class="assessment-one-content">
									<h3>Weet u niet welke dienst past?</h3>
									<p>De aanvraaghulp geeft informatie en helpt u voorbereiden. U dient hier niets in.</p>
									<a href="/diensten" class="pbmit-btn">
										<span>Bekijk diensten</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
            </section>
            <!-- Guidance End -->

            <!-- Stakeholders Start -->
            <section>
				<div class="container">
					<div class="portfolio-one-bg">
						<div class="pbmit-heading-subheading text-center">
							<h4 class="pbmit-subtitle">Samenwerkende instanties</h4>
							<h2 class="pbmit-title">Belangrijke instanties <em>voor uw aanvraag</em></h2>
						</div>
						<p class="text-center">Bekijk welke overheidsinstanties betrokken kunnen zijn bij uw aanvraag of procedure.</p>
						<div class="swiper-slider swiper-btn-right-dots vz-equal-slides" data-loop="false" data-autoplay="false" data-dots="true" data-arrows="false" data-columns="4" data-margin="30" data-effect="slide">
							<div class="swiper-wrapper">
${stakeholderSlides}
							</div>
						</div>
					</div>
				</div>
            </section>
            <!-- Stakeholders End -->

            <!-- News Start -->
            <section class="section-lg">
				<div class="container">
					<div class="blog-one-content">
						<div class="row">
							<div class="col-md-6">
								<div class="pbmit-heading-subheading">
									<h4 class="pbmit-subtitle">Nieuws</h4>
									<h2 class="pbmit-title">Nieuws en<br> <em>mededelingen</em></h2>
								</div>
							</div>
							<div class="col-md-6">
								<p>Officiële mededelingen van Vreemdelingenzaken worden hier gepubliceerd zodra deze beschikbaar zijn.</p>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<article class="pbminfotech-blogbox-style-2">
								<div class="post-item">
									<div class="pbminfotech-box-content">
										<div class="pbminfotech-box-title">
											<h2 class="pbminfotech-title">Er zijn nu geen mededelingen.</h2>
										</div>
										<div class="pbmit-blogbox-readmore pbminfotech-vc_btn3">
											<div class="pbminfotech-blogbox-footer-left">
												<a href="/nieuws">Naar nieuws en mededelingen</a>
											</div>
										</div>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
            </section>
            <!-- News End -->
${contentClose()}
${footer()}
`;
