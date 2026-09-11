/**
 * /nieuws/$slug — governed empty state on ported Liviza
 * `blog-single-view.html` article + sidebar geometry (LFB-103D POLISH 001).
 * Author box, comments, sharing, tags, search and related posts removed.
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
		<section class="section-lgb">
			<div class="container">
				<div class="row">
					<div class="col-lg-9 blog-details">
						<article class="post blog-classic">
							<div class="pbmit-blog-classic-inner">
								<div class="pbmit-entry-content">
									<h3 class="pbmit-post-title">Deze mededeling is niet beschikbaar.</h3>
									<p>Er zijn nu geen mededelingen gepubliceerd. Bekijk het overzicht van nieuws en mededelingen.</p>
									<a class="pbmit-btn" href="/nieuws"><span>Naar het overzicht</span></a>
								</div>
							</div>
						</article>
					</div>
					<div class="col-lg-3 blog-left-col blog-details">
						<aside class="sidebar vz-sidebar">
							<aside class="widget">
								<h3 class="widget-title">Meer informatie</h3>
								<ul>
									<li><a href="/nieuws">Nieuws en mededelingen</a></li>
									<li><a href="/diensten">Diensten</a></li>
									<li><a href="/documentenlijsten">Documentenlijsten</a></li>
									<li><a href="/contact">Contact</a></li>
								</ul>
							</aside>
						</aside>
					</div>
				</div>
			</div>
		</section>
		<!-- Blog Details End -->
${contentClose()}
${footer()}
`;
