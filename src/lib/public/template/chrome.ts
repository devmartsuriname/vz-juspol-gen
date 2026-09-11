/**
 * Shared governed page chrome (LFB-103D).
 *
 * The markup, class names and nesting are taken verbatim from the ported
 * Liviza `header-style-1` chrome so geometry, typography and responsive
 * behaviour stay 1:1. Only the content inside the slots is governed VZ
 * content. Newsletter, social links, search overlay, demo phone and demo
 * footer widgets are removed.
 */

import { categories, identity } from "@/content/vz-content";

export const ASSETS = "/vz-public/liviza/assets";

/** Root of the VZ-owned generated imagery (LFB-104). */
export const VZ_IMAGES = "/vz-public/images";

/** Category card imagery, one distinct 800x535 WebP per governed category. */
export const categoryImage: Record<string, string> = {
  verblijf: `${VZ_IMAGES}/category/verblijf.webp`,
  vestiging: `${VZ_IMAGES}/category/vestiging.webp`,
  naturalisatie: `${VZ_IMAGES}/category/naturalisatie.webp`,
  ingezetenschap: `${VZ_IMAGES}/category/ingezetenschap.webp`,
  asiel: `${VZ_IMAGES}/category/asiel.webp`,
  overig: `${VZ_IMAGES}/category/overig.webp`,
};

/** Stakeholder card imagery, one distinct 800x650 WebP per governed entry. */
export const stakeholderImages: readonly string[] = [
  `${VZ_IMAGES}/instantie/vreemdelingendienst.webp`,
  `${VZ_IMAGES}/instantie/immigratiedienst.webp`,
  `${VZ_IMAGES}/instantie/werkvergunningen.webp`,
  `${VZ_IMAGES}/instantie/consulaire-zaken.webp`,
  `${VZ_IMAGES}/instantie/burgerzaken.webp`,
  `${VZ_IMAGES}/instantie/bedrijfsvergunningen.webp`,
];

function navItems(active: string): string {
  const categoryItems = categories
    .map(
      (category) =>
        `<li><a href="/diensten/${category.slug}">${category.label}</a></li>`,
    )
    .join("\n\t\t\t\t\t\t\t\t\t\t\t\t");

  const item = (href: string, label: string) =>
    `<li class="${active === href ? "active" : ""}"><a href="${href}">${label}</a></li>`;

  return `
													<ul class="navigation clearfix">
														${item("/", "Home")}
														${item("/over-ons", "Over ons")}
														<li class="dropdown ${active.startsWith("/diensten") ? "active" : ""}">
															<a href="/diensten">Diensten</a>
															<ul>
																${categoryItems}
															</ul>
														</li>
														${item("/aanvraaghulp", "Aanvraaghulp")}
														${item("/documentenlijsten", "Documentenlijsten")}
														${item("/nieuws", "Nieuws")}
														${item("/contact", "Contact")}
													</ul>`;
}

function headerTop(active: string): string {
  return `
		<header class="site-header header-style-1">
			<div class="pre-header">
				<div class="container-fluid">
					<div class="d-flex align-items-center">
						<div class="pbmit-table pbmit-pre-header-content">
							<div class="pbmit-table-cell">
								<ul class="top-contact">
									<li>
										<i class="pbmit-base-icon-location-pin"></i>
										<span>Adres: </span>${identity.address}
									</li>
									<li>
										<i class="pbmit-base-icon-mobile"></i>
										<span>Telefoon: </span>${identity.phone}
									</li>
									<li>
										<i class="pbmit-base-icon-envelope"></i>
										<span>E-mail: </span>${identity.email}
									</li>
								</ul>
							</div>
							<div class="pbmit-table-cell pbmit-align-right">
								<ul class="top-contact">
									<li>
										<i class="pbmit-base-icon-clock"></i>
										<span>Openingstijden: </span>${identity.hours}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="site-header-menu">
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-12">
							<div class="d-flex align-items-center justify-content-between">
								<div class="d-flex justify-content-between align-items-center">
									<div class="site-branding">
										<span class="site-title">
											<a class="vz-brand-link" href="/">
												<span class="vz-brand-name">${identity.name}</span>
												<span class="vz-brand-sub">${identity.subline}</span>
											</a>
										</span>
									</div>
									<div class="site-navigation">
										<nav class="main-menu navbar-expand-xl navbar-light">
											<div class="navbar-header">
												<!-- Toggle Button -->
												<button class="navbar-toggler" type="button" aria-label="Menu openen">
													<i class="pbmit-liviza-icon-bars"></i>
												</button>
											</div>
											<div class="pbmit-mobile-menu-bg"></div>
											<div class="collapse navbar-collapse clearfix show" id="pbmit-menu">
												<div class="pbmit-menu-wrap">${navItems(active)}
												</div>
											</div>
										</nav>
									</div>
								</div>
								<div class="pbmit-right-side">
									<div class="pbmit-header-phone">
										<a href="${identity.phoneHref}">
											<span class="pbmit-header-phone-w-inner">
												<i class="pbmit-base-icon-chat-2"></i>
												<span class="pbmit-phone-title">Heeft u vragen?</span>
												<span class="pbmit-phone-number">${identity.phone}</span>
											</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`;
}

/** Header for inner pages (no hero slider). */
export function header(active: string): string {
  return `${headerTop(active)}
		</header>
		<!-- Header Main Area End Here -->
`;
}

type HeroSlide = {
  readonly slot: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly lead: string;
  readonly ctaHref: string;
  readonly ctaLabel: string;
};

/** Three governed hero slides on the Liviza `pbmit-slider-one` geometry. */
const heroSlides: readonly HeroSlide[] = [
  {
    slot: "vz-hero-slide-1",
    eyebrow: "Informatie en voorbereiding",
    title: "Voorbereid naar <span>Vreemdelingenzaken</span>",
    lead: "Vind informatie over diensten, documenten en voorbereiding. Dit is geen aanvraag.",
    ctaHref: "/diensten",
    ctaLabel: "Bekijk diensten",
  },
  {
    slot: "vz-hero-slide-2",
    eyebrow: "Documenten",
    title: "Weet welke <span>documenten</span> u nodig heeft",
    lead: "Open de officiële documentenlijsten per dienst voordat u naar het kantoor gaat.",
    ctaHref: "/documentenlijsten",
    ctaLabel: "Documentenlijsten",
  },
  {
    slot: "vz-hero-slide-3",
    eyebrow: "Aanvraaghulp",
    title: "Bepaal uw <span>voorbereiding</span> stap voor stap",
    lead: "Beantwoord enkele vragen en zie welke dienst en documenten bij uw situatie horen.",
    ctaHref: "/aanvraaghulp",
    ctaLabel: "Naar aanvraaghulp",
  },
];

function heroSlide(slide: HeroSlide): string {
  return `						<div class="swiper-slide">
							<div class="pbmit-slider-item">
								<div class="pbmit-slider-bg ${slide.slot}"></div>
								<div class="container">
									<div class="row">
										<div class="col-md-7">
											<div class="pbmit-slider-content">
												<h5 class="pbmit-sub-title">${slide.eyebrow}</h5>
												<h2 class="pbmit-title">${slide.title}</h2>
												<p class="vz-hero-lead">${slide.lead}</p>
												<div class="pbmit-button">
													<a class="pbmit-button" href="${slide.ctaHref}">
														<span class="pbmit-icon"><i class="fa fa-angle-right"></i></span>
														<span class="pbmit-text">${slide.ctaLabel}</span>
													</a>
												</div>
											</div>
										</div>
										<div class="col-md-5"></div>
									</div>
								</div>
							</div>
						</div>`;
}

/**
 * Home header including the hero area. Three governed slides on the original
 * Liviza slider geometry. Autoplay stays off so the carousel never moves
 * without user action; dots and arrows provide pointer and keyboard control.
 */
export function homeHeader(): string {
  return `${headerTop("/")}
			<div class="pbmit-slider-area pbmit-slider-one">
				<div class="swiper-slider" data-autoplay="false" data-loop="true" data-dots="true" data-arrows="true" data-columns="1" data-margin="0" data-effect="fade" aria-roledescription="carrousel" aria-label="Uitgelichte informatie">
					<div class="swiper-wrapper">
${heroSlides.map(heroSlide).join("\n")}
					</div>
				</div>
			</div>
		</header>
		<!-- Header Main Area End Here -->
`;
}

/** Inner-page title bar with breadcrumb, geometry unchanged. */
export function titleBar(title: string, crumbs: readonly { label: string; href?: string }[]): string {
  const trail = crumbs
    .map((crumb, index) => {
      const last = index === crumbs.length - 1;
      const content = last
        ? `<span><span class="post-root post post-post current-item"> ${crumb.label}</span></span>`
        : `<span><a href="${crumb.href}">${crumb.label}</a></span>`;
      return `${content}
								<span class="sep">  →  </span>`;
    })
    .join("\n\t\t\t\t\t\t\t\t")
    .replace(/\s*<span class="sep">\s*→\s*<\/span>$/, "");

  return `
         <!-- Title Bar -->
         <div class="pbmit-title-bar-wrapper">
            <div class="container">
				<div class="pbmit-title-bar-content">
					<div class="pbmit-title-bar-content-inner">
						<div class="pbmit-tbar">
							<div class="pbmit-tbar-inner container">
								<h1 class="pbmit-tbar-title"> ${title}</h1>
							</div>
						</div>
						<div class="pbmit-breadcrumb">
							<div class="pbmit-breadcrumb-inner">
								<span><a title="Home" href="/" class="home"><i class="fa fa-home"></i></a></span>
								<span class="sep">  →  </span>
								${trail}
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>
         <!-- Title Bar End-->
`;
}

/** Governed four-column footer. Newsletter and social links removed. */
export function footer(): string {
  const categoryLinks = categories
    .map((category) => `<li><a href="/diensten/${category.slug}">${category.label}</a></li>`)
    .join("\n\t\t\t\t\t\t\t\t\t\t\t");

  return `
		<!-- footer -->
		<footer class="footer site-footer">
			<div class="pbmit-footer-widget-area">
				<div class="container">
					<div class="second-footer-inner">
						<div class="row">
							<div class="col-md-6 col-lg-4">
								<div class="widget">
									<div class="textwidget">
										<p class="vz-footer-name">${identity.name}</p>
										<p class="vz-footer-sub">${identity.subline}</p>
										<p>Informatie over diensten, documenten en voorbereiding. U dient via deze website niets in.</p>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-3">
								<div class="widget">
									<h3 class="widget-title">Informatie</h3>
									<div class="textwidget">
										<ul>
											<li><a href="/over-ons">Over ons</a></li>
											<li><a href="/diensten">Diensten</a></li>
											<li><a href="/aanvraaghulp">Aanvraaghulp</a></li>
											<li><a href="/documentenlijsten">Documenten&shy;lijsten</a></li>
											<li><a href="/veelgestelde-vragen">Vragen</a></li>
											<li><a href="/nieuws">Nieuws</a></li>
											<li><a href="/instanties">Instanties</a></li>
											<li><a href="/contact">Contact</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-2">
								<div class="widget">
									<h3 class="widget-title">Diensten</h3>
									<div class="menu-visa">
										<ul>
											${categoryLinks}
										</ul>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-3">
								<div class="widget">
									<h3 class="widget-title">Contact</h3>
									<ul class="pbmit_contact_widget_wrapper">
										<li class="pbmit-contact-address  pbmit-base-icon-location-pin">
											<strong>${identity.unit}</strong><br>${identity.address}
										</li>
										<li class="pbmit-contact-phonenumber pbmit-base-icon-mobile">
											<strong>Telefoon</strong><br>${identity.phone}
										</li>
										<li class="pbmit-contact-envelope pbmit-base-icon-envelope">
											<strong>E-mail</strong><br>${identity.email}
										</li>
										<li class="pbmit-contact-address pbmit-base-icon-clock">
											<strong>Openingstijden</strong><br>${identity.hours}<br>${identity.hoursClosed}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="pbmit-footer-bottom">
				<div class="container">
					<div class="pbmit-footer-text-inner">
						<div class="row">
							<div class="col-md-5">
								<div class="pbmit-footer-left">${identity.name} — ${identity.subline}</div>
							</div>
							<div class="col-md-7">
								<div class="pbmit-footer-right">
									<ul class="footer-nav-menu">
										<li><a href="/privacy">Privacy</a></li>
										<li><a href="/disclaimer">Disclaimer</a></li>
										<li><a href="/instanties">Instanties</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
		<!-- footer End -->

	</div>
	<!-- page wrapper End -->
`;
}

/** Opening wrapper + header for an inner page. */
export function pageOpen(active: string): string {
  return `
	<!-- page wrapper -->
	<div class="page-wrapper">
${header(active)}`;
}

export function contentOpen(extraClass = ""): string {
  return `
		<!-- Page Content -->
		<div class="page-content${extraClass ? ` ${extraClass}` : ""}">
`;
}

export function contentClose(): string {
  return `
		</div>
		<!-- Page Content End -->
`;
}
