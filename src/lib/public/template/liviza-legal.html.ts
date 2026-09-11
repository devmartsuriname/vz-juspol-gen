/**
 * /privacy and /disclaimer — governed exact copy on the ported Liviza
 * `blog-single-view.html` article + sidebar geometry (LFB-103D POLISH 001).
 * Comments, sharing, tags, author box, search and recent-post widgets are
 * removed; the article/sidebar rhythm is preserved.
 */

import {
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

function article(
  active: string,
  title: string,
  paragraphs: readonly string[],
): string {
  const body = paragraphs
    .map((paragraph) => `									<p>${paragraph}</p>`)
    .join("\n");

  return `${pageOpen(active)}
${titleBar(title, [{ label: title }])}
${contentOpen()}
		<!-- Article -->
		<section class="section-lgb">
			<div class="container">
				<div class="row">
					<div class="col-lg-9 blog-details">
						<article class="post blog-classic">
							<div class="pbmit-blog-classic-inner">
								<div class="pbmit-entry-content">
									<h3 class="pbmit-post-title">${title}</h3>
${body}
								</div>
							</div>
						</article>
					</div>
					<div class="col-lg-3 blog-left-col blog-details">
						<aside class="sidebar vz-sidebar">
							<aside class="widget">
								<h3 class="widget-title">Juridische informatie</h3>
								<ul>
									<li><a href="/privacy">Privacyverklaring</a></li>
									<li><a href="/disclaimer">Disclaimer</a></li>
								</ul>
							</aside>
							<aside class="widget">
								<h3 class="widget-title">Meer informatie</h3>
								<ul>
									<li><a href="/diensten">Diensten</a></li>
									<li><a href="/documentenlijsten">Documentenlijsten</a></li>
									<li><a href="/instanties">Instanties</a></li>
									<li><a href="/contact">Contact</a></li>
								</ul>
							</aside>
						</aside>
					</div>
				</div>
			</div>
		</section>
		<!-- Article End -->
${contentClose()}
${footer()}
`;
}

export const LIVIZA_PRIVACY_HTML = article("/privacy", "Privacyverklaring", [
  "Deze website is een informatieve website van Vreemdelingenzaken. U kunt hier informatie lezen en uw bezoek voorbereiden.",
  "Er is geen publiek account en geen inlogmogelijkheid.",
  "U kunt via deze website geen officiële aanvraag indienen.",
  "De aanvraaghulp verwerkt geen vrije tekst en vraagt niet om persoonsgegevens.",
  "Er wordt standaard geen analyse- of volgsoftware gebruikt.",
  "Er is geen nieuwsbrief, marketingtracking of sociale-mediawidget.",
  "Er is geen contactformulier waarmee persoonsgegevens worden verzonden.",
  "Wilt u contact opnemen, gebruik dan de gegevens op de pagina Contact.",
  "Deze verklaring wordt aangepast voordat inloggen, formulieren, statistieken of transacties worden toegevoegd.",
]);

export const LIVIZA_DISCLAIMER_HTML = article("/disclaimer", "Disclaimer", [
  "Deze website geeft informatie en ondersteunt uw voorbereiding.",
  "De aanvraaghulp is geen aanvraag, geen indiening en geen beslissing over uw situatie.",
  "Controleer de actuele vereisten altijd bij Vreemdelingenzaken.",
  "De gepubliceerde documenten zijn de officiële brondocumenten van Vreemdelingenzaken.",
  "Waar kosten of wettelijke grondslagen nog niet zijn bevestigd, worden deze niet weergegeven en niet geschat.",
]);
