/**
 * /veelgestelde-vragen — governed empty state on ported Liviza `faq.html`
 * accordion geometry. No question or answer is invented.
 */

import {
  contentClose,
  contentOpen,
  footer,
  pageOpen,
  titleBar,
} from "./chrome";

export const LIVIZA_FAQ_HTML = `${pageOpen("/veelgestelde-vragen")}
${titleBar("Veelgestelde vragen", [{ label: "Veelgestelde vragen" }])}
${contentOpen()}
            <!-- FAQ -->
            <section class="section-lg">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<h3 class="pbmit-title mb-3">Veelgestelde vragen</h3>
							<p class="pb-2">Antwoorden worden per onderwerp weergegeven.</p>
							<div class="accordion" id="accordionExample">
								<div class="accordion-item">
									<h2 class="accordion-header" id="headingOne">
										<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
											Veelgestelde vragen worden bevestigd.
											<i class="pbmit-controls-icon-chevron"></i>
										</button>
									</h2>
									<div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
										<div class="accordion-body">
											Er zijn nog geen goedgekeurde antwoorden gepubliceerd. Neem voor uw vraag contact op met Vreemdelingenzaken of bekijk de diensten en documentenlijsten.
										</div>
									</div>
								</div>
							</div>
							<p class="vz-actions">
								<a class="pbmit-btn" href="/diensten"><span>Bekijk diensten</span></a>
							</p>
						</div>
					</div>
				</div>
            </section>
            <!-- FAQ end -->
${contentClose()}
${footer()}
`;
