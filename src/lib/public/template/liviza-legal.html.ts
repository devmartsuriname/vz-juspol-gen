/**
 * /privacy and /disclaimer — governed exact copy on restrained Liviza
 * inner-page article geometry.
 */

import {
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

function article(active: string, title: string, paragraphs: readonly string[]): string {
  const body = paragraphs
    .map((paragraph) => `							<p>${paragraph}</p>`)
    .join("\n");

  return `${pageOpen(active)}
${titleBar(title, [{ label: title }])}
${contentOpen()}
            <!-- Article -->
            <section class="section-lg">
				<div class="container">
					<div class="row">
						<div class="col-md-12 col-lg-8">
							<div class="pbmit-entry-content">
								<h3>${title}</h3>
${body}
							</div>
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
