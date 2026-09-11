/**
 * /nieuws/$slug — governed empty state on ported Liviza
 * `blog-single-view.html` geometry. Author box, comments, sharing, tags and
 * related posts removed.
 */

import {
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

export const LIVIZA_NEWS_DETAIL_HTML = `${pageOpen("/nieuws")}
${titleBar("Mededeling", [
  { label: "Nieuws en mededelingen", href: "/nieuws" },
  { label: "Mededeling" },
])}
${contentOpen()}
		<!-- Blog Details -->
		<section class="section-lg">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="pbmit-entry-content">
							<h3 class="pbmit-post-title">Deze mededeling is niet beschikbaar.</h3>
							<p>Er zijn nu geen mededelingen gepubliceerd. Bekijk het overzicht van nieuws en mededelingen.</p>
							<a class="pbmit-btn" href="/nieuws"><span>Naar het overzicht</span></a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- Blog Details End -->
${contentClose()}
${footer()}
`;
