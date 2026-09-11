/**
 * /nieuws — governed empty state on ported Liviza `blog-grid-view.html`
 * geometry. Tags, search, sharing, pagination and categories removed.
 */

import {
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

export const LIVIZA_NEWS_HTML = `${pageOpen("/nieuws")}
${titleBar("Nieuws en mededelingen", [{ label: "Nieuws en mededelingen" }])}
${contentOpen()}
            <!-- Blog Grid -->
            <section class="section-lg">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<article class="pbminfotech-blogbox-style-2">
								<div class="post-item">
									<div class="pbminfotech-box-content">
										<div class="pbminfotech-box-title">
											<h2 class="pbminfotech-title">Er zijn nu geen mededelingen.</h2>
										</div>
										<div class="pbminfotech-service-content">
											<p>Officiële mededelingen van Vreemdelingenzaken worden hier gepubliceerd zodra deze beschikbaar zijn.</p>
										</div>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
            </section>
            <!-- Blog Grid End -->
${contentClose()}
${footer()}
`;
