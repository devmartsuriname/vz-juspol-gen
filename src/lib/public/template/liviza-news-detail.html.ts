// Liviza `blog-single-view.html` <body> markup, ported 1:1 from the purchased template.
// TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER
// Generated in Act 1B (LFB-103C). Asset paths prefixed to /vz-public/liviza/assets/;
// internal template links normalised to the canonical Dutch routes.
export const LIVIZA_NEWS_DETAIL_HTML = `

    <!-- Page Wrapper -->
    <div class="page-wrapper">

        <!-- Header Main Area -->
		<header class="site-header header-style-1">
			<div class="pbmit-header-overlay"> 
				<div class="pre-header">
					<div class="container-fluid">
						<div class="d-flex align-items-center">
							<div class="pbmit-table pbmit-pre-header-content">
								<div class="pbmit-table-cell">
									<ul class="top-contact">
										<li>
											<i class="pbmit-base-icon-location-pin"></i>
											<span>Address: </span>Los Angeles Gournadi
										</li>
										<li>
											<i class="pbmit-base-icon-envelope"></i>
											<span>Email Address: </span>mail@example.com
										</li>
									</ul>
								</div>
								<div class="pbmit-table-cell pbmit-align-right">
									<div class="pbmit-social-links-wrapper">
										<ul class="social-icons">
											<li class="pbmit-social-facebook">
												<a class=" tooltip-top" target="_blank" href="#" data-tooltip="Facebook">
													<i class="pbmit-base-icon-facebook"></i>
												</a>
											</li>
											<li class="pbmit-social-twitter">
												<a class=" tooltip-top" target="_blank" href="#" data-tooltip="Twitter">
													<i class="pbmit-base-icon-twitter"></i>
												</a>
											</li>
											<li class="pbmit-social-flickr">
												<a class=" tooltip-top" target="_blank" href="#" data-tooltip="Flickr">
													<i class="pbmit-base-icon-flickr"></i>
												</a>
											</li>
											<li class="pbmit-social-linkedin">
												<a class=" tooltip-top" target="_blank" href="" data-tooltip="LinkedIn">
													<i class="pbmit-base-icon-linkedin"></i>
												</a>
											</li>
										</ul>
									</div>
									<div class="pbmit-header-button">
										<a class="pbmit-btn" href="/contact" title="">
											<span>Book A Consultation</span>
										</a>
									</div>
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
												<a href="/">
													<img class="logo-img" src="/vz-public/liviza/assets/images/logo-white.png" alt="">
												</a>
											</span>
										</div>
										<div class="site-navigation">
											<nav class="main-menu navbar-expand-xl navbar-light">
												<div class="navbar-header">
													<!-- Toggle Button --> 
													<button class="navbar-toggler" type="button">
														<i class="pbmit-liviza-icon-bars"></i>
													</button>
												</div>
												<div class="pbmit-mobile-menu-bg"></div>
												<div class="collapse navbar-collapse clearfix show" id="pbmit-menu">
													<div class="pbmit-menu-wrap">
														<ul class="navigation clearfix">
															<li class="dropdown active">
																<a href="/">Home</a>
																<ul>
																	<li><a href="/">Homepage 1</a></li>
																	<li><a href="homepage-2.html">Homepage 2</a></li>
																	<li><a href="homepage-3.html">Homepage 3</a></li>
																</ul>
															</li>
															<li class="dropdown">
																<a href="#">Coaching</a>
																<ul>
																	<li><a href="coaching.html">Coaching</a></li>
																	<li><a href="coaching-details.html">Coaching Details</a></li>
																</ul>
															</li>
															<li class="dropdown">
																<a href="#">Visa</a>
																<ul>
																	<li><a href="/diensten/verblijf">Visa</a></li>
																	<li><a href="/diensten/verblijf/voorbeeld">Visa Details</a></li>
																</ul>
															</li>
															<li class="dropdown">
																<a href="#">Country</a>
																<ul>
																	<li><a href="countries.html">Countries</a></li>
																	<li><a href="countries-details.html">Countries Details</a></li>
																</ul>
															</li>
															<li class="dropdown">
																<a href="#">Pages</a>
																<ul>
																	<li><a href="/over-ons">About us</a></li>
																	<li><a href="/diensten">Our Services</a></li>
																	<li><a href="our-team-member.html">Our Team Member</a></li>
																	<li><a href="team-member-details.html">Team Member Details</a></li>
																	<li><a href="/contact">Contacts</a></li>
																	<li><a href="/veelgestelde-vragen">Faq</a></li>
																</ul>
															</li>
															<li class="dropdown">
																<a href="#">Blog</a>
																<ul>
																	<li><a href="blog-large-image.html">Blog Large Image</a></li>
																	<li><a href="/nieuws">Blog Grid View</a></li>
																	<li class="active"><a href="/nieuws/voorbeeld">Blog Single View</a></li>
																</ul>
															</li>
														</ul>
													</div>
												</div>
											</nav>
										</div>
									</div>
									<div class="pbmit-right-side">
										<div class="pbmit-header-phone">
											<a href="tel:0123888555">
												<span class="pbmit-header-phone-w-inner"> 
													<i class="pbmit-base-icon-chat-2"></i>
													<span class="pbmit-phone-title">Have any Questions?</span>
													<span class="pbmit-phone-number">+0 123 888 555</span>
												</span>
											</a>
										</div>
										<div class="pbmit-header-search-btn">
											<a href="#">
												<i class="pbmit-base-icon-search-2"></i>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		<!-- Header Main Area End Here -->

		<!-- Title Bar -->
		<div class="pbmit-title-bar-wrapper">
            <div class="container">
				<div class="pbmit-title-bar-content">
					<div class="pbmit-title-bar-content-inner">
						<div class="pbmit-tbar">
							<div class="pbmit-tbar-inner container">
								<h1 class="pbmit-tbar-title"> Blog</h1>
							</div>
						</div>
						<div class="pbmit-breadcrumb">
							<div class="pbmit-breadcrumb-inner">
								<span><a title="" href="#" class="home"><i class="fa fa-home"></i></a></span>
								<span class="sep">  →  </span>
								<span><a title="" href="#" class="home">Blog Large Image</a></span>
								<span class="sep">  →  </span>
								<span><a title="" href="#" class="home">Business Visa</a></span>
								<span class="sep">  →  </span>
								<span><span class="post-root post post-post current-item">Ways to immigrate to saskatchewan</span></span>
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>
		<!-- Title Bar End-->

		<!-- Page Content -->
		<div class="page-content"> 

		<!-- Blog Details -->
		<section class="section-lgb">
			<div class="container">
				<div class="row">
					<div class="col-lg-9 blog-right-col ">
						<div class="row">
							<div class="col-md-12">
								<article class="post blog-details"> 
									<div class="blog-classic">    
										<div class="pbmit-featured-img-wrapper">
											<div class="pbmit-featured-wrapper">
												<img src="/vz-public/liviza/assets/images/homepage-1/blog/bolg-02b.jpg" class="img-fluid w-100" alt="">
											</div>
										</div>
										<div class="pbmit-blog-classic-inner">
											<div class="pbmit-blog-meta-wrapper">
												<div class="pbmit-blog-date">
													<span class="pbmit-meta-line pbmit-date">June 13, 2019</span>
												</div>
												<h3 class="pbmit-post-title">
													<a href="/nieuws/voorbeeld">Ways to immigrate to saskatchewan</a> 
												</h3>
												<div class="pbmit-blog-meta pbmit-blog-meta-top">
													<span class="pbminfotech-meta-line byline">
														<i class="pbmit-base-icon-user"></i>  
														<span class="author vcard">
															<span class="screen-reader-text pbminfotech-hide">Author </span>By 
															<a class="url fn n" href="blog-large-image.html">admin</a>
														</span>
													</span>
													<span class="pbminfotech-meta-line cat-links">
														<i class="pbmit-base-icon-category"></i> 
														<span class="screen-reader-text pbminfotech-hide">Categories </span>
														<a href="blog-large-image.html" rel="category tag">Business Visa</a>
													</span>
													<span class="pbminfotech-meta-line comments-link">
														<i class="pbmit-base-icon-comment-1"></i> 
														<a href="blog-large-image.html">3</a>
													</span>
												</div>
											</div>
											<div class="pbmit-entry-content">
												<p>Our Consult are Providing Immigration and Visa to the highest standards, with state-of-the-art. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in velit esse cillum dolore eu fugiat nulla pariatur.</p>
												<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
												<blockquote>
													<p>
														Thanks to this legal company, I got all my property back and got mytation restored. The team of professional Consultant will surely to this legal company, I got all my prsucceed in your Consultants will surely case too.
														<cite>Hyet Malik</cite>
													</p>
												</blockquote>
												<p>Quisque mattis, ligula id sodales ullamcorper, urna sem placerat lacus, id laoreet lectus sapien quis nisl. Phasellus eu massa id leo consectetur vehicula. Donec quis finibus lacus, id accumsan magna. Etiam ullamcorper id quam vitae iaculis.</p>
												<h4>How different from the competition?
													<img src="/vz-public/liviza/assets/images/homepage-1/blog/img-01.jpg" class="img-fluid alignright" alt="">
												</h4>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
												<ul class="list-group list-group-borderless">
													<li class="list-group-item">
														<i class="fa fa-check"></i> The majority have suffered alteration
													</li>
													<li class="list-group-item">
														<i class="fa fa-check"></i>Best Exam Preparation with us
													</li>
													<li class="list-group-item">
														<i class="fa fa-check"></i>Go to the our official website
													</li>
													<li class="list-group-item">
														<i class="fa fa-check"></i>Not any extra cost for visa processing.
													</li>
													<li class="list-group-item">
														<i class="fa fa-check"></i>Talk to one of our consultant today!
													</li>
												</ul>
												<h4 class="pbmit-entry-title">We Exist to Inspire the World to Play.</h4>
												<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English. Many desktop publishing packages and web page editors Sed eleifend ligula vitae ligula euismod porta. Donec in accumsan tellus.</p>
											</div>
											<div class="pbmit-blog-meta pbmit-blog-meta-bottom">
												<div class="pbmit-blog-meta-bottom-left">
													<span class="pbmit-meta pbmit-meta-tags">
														<a href="blog-large-image.html" rel="tag">Immigration</a>
														<a href="blog-large-image.html" rel="tag">Travel</a>
													</span>
												</div>
												<div class="pbmit-blog-meta-bottom-right">
													<div class="pbmit-social-share-title">Share:</div>
													<div class="pbmit-social-share">
														<ul>
															<li class="pbmit-social-li pbmit-social-li-facebook">
																<a class="pbmit-popup" href="#">
																	<i class="pbmit-base-icon-facebook"></i>
																</a>
															</li>
															<li class="pbmit-social-li pbmit-social-li-twitter">
																<a class="pbmit-popup" href="#">
																	<i class="pbmit-base-icon-twitter"></i>
																</a>
															</li>
															<li class="pbmit-social-li pbmit-social-li-tumblr">
																<a class="pbmit-popup" href="#">
																	<i class="pbmit-base-icon-pinterest"></i>
																</a>
															</li>
															<li class="pbmit-social-li pbmit-social-li-pinterest">
																<a class="pbmit-popup" href="#" >
																	<i class="pbmit-base-icon-linkedin"></i>
																</a>
															</li>
														</ul>
													</div> 
												</div>
											</div>
										</div>
									</div>
								</article> 
								<div class="comments-box">
									<h2 class="comments-title">3 Replies to “Ways to immigrate to saskatchewan”</h2>
									<div class="media depth-1 comment">
										<div class="comment-author">
											<img src="/vz-public/liviza/assets/images/homepage-1/avatar/img-01.png" class="img-fluid" alt="">
										</div>
										<div class="media-body comment-meta">
											<span>John Doe</span>
											<a href="#">November 20, 2019 at 5:28 am</a>
											<p>Vivamus gravida felis et nibh tristique viverra. Sed vel tortor id ex accumsan lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
											<div class="reply">
												<a class="" href="#"> Reply</a>
											</div>
										</div>
									</div>
									<div class="children comment">
										<div class="media even depth-2">
											<div class="comment-author">
												<img src="/vz-public/liviza/assets/images/homepage-1/avatar/img-02.png" class="img-fluid" alt="">
											</div>
											<div class="media-body comment-meta">
												<span>Leona Spencer</span>
												<a href="#">November 20, 2019 at 5:28 am</a>
												<p>Sed maximus imperdiet ipsum, id scelerisque nisi tincidunt vitae. In lobortis neque nec dolor vehicula, eget vulputate ligula lobortis.</p>
												<div class="reply">
													<a class="" href="#"> Reply</a>
												</div>
											</div>
										</div>
									</div>
									<div class="media depth-1 comment">
										<div class="comment-author">
											<img src="/vz-public/liviza/assets/images/homepage-1/avatar/img-01.png" class="img-fluid" alt="">
										</div>
										<div class="media-body comment-meta">
											<span>John Doe</span>
											<a href="#">November 20, 2019 at 5:29 am</a>
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium eius, sunt porro corporis maiores ea, voluptatibus omnis maxime</p>
											<div class="reply">
												<a class="" href="#"> Reply</a>
											</div>
										</div>
									</div>
								</div>
								<div class="comment-respond">
									<h3 class="comment-reply-title">Leave a Reply</h3>
									<div class="comment-form">
										<p class="comment-notes">Your email address will not be published. </p>
										<form>
											<div class="row">
												<div class="col-12">
													<textarea class="form-control" name="comment" placeholder="Comment" cols="45" rows="8"></textarea>
												</div>
												<div class="col-md-12"> 
													<input id="name" type="text" placeholder="Name (required)" class="form-control" name="name">
												</div>
												<div class="col-md-12"> 
													<input id="email" class="form-control" placeholder="Email (required)" name="email" type="email" value="">
												</div>
												<div class="col-md-12"> 
													<input id="url" class="form-control" placeholder="Website" name="url" type="text" value="">
												</div> 
												<div class="col-md-12">
													<div class="comment-form-cookies-consent">
														<input name="wp-comment-cookies-consent" type="checkbox" value="yes">
														<label>Save my name, email, and website in this browser for the next time I comment.</label>
													</div>
												</div> 
												<div class="col-md-12"> 
													<button type="submit" class="pbmit-btn">Post Comment</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div> 
						</div>
					</div>
					<div class="col-lg-3 blog-left-col blog-details">
						<aside class="sidebar">
							<aside class="widget widget-search">
								<form class="search-form">
									<input type="search" class="search-field" placeholder="Search …" value="">
									<a href="#"><i class="pbmit-base-icon-search-2"></i></a>
								</form>
							</aside>
							<aside class="widget widget-recent-post">
								<h2 class="widget-title">Recent posts</h2>
								<ul class="recent-post-list">
									<li class="recent-post-list-li"> 
										<a class="recent-post-thum" href="/nieuws/voorbeeld">
											<img src="/vz-public/liviza/assets/images/homepage-1/recent-post/blog-01.jpg" class="img-fluid" alt="">
										</a>
										<div class="media-body">
											<span class="post-date">June 13, 2019</span>
											<a href="/nieuws/voorbeeld">Top 9 Most Demand Jobs In Canada</a>
										</div> 
									</li>
									<li class="recent-post-list-li"> 
										<a class="recent-post-thum" href="/nieuws/voorbeeld">
											<img src="/vz-public/liviza/assets/images/homepage-1/recent-post/blog-02.jpg" class="img-fluid" alt="">
										</a>
										<div class="media-body">
											<span class="post-date">June 13, 2019</span>
											<a href="/nieuws/voorbeeld">Ways to immigrate to saskatchewan</a>
										</div> 
									</li>
									<li class="recent-post-list-li"> 
										<a class="recent-post-thum" href="/nieuws/voorbeeld">
											<img src="/vz-public/liviza/assets/images/homepage-1/recent-post/blog-03.jpg" class="img-fluid" alt="">
										</a>
										<div class="media-body">
											<span class="post-date">June 13, 2019</span>
											<a href="/nieuws/voorbeeld">Independent Of Visa immigration</a>
										</div> 
									</li>
								</ul>
							</aside>
							<aside class="widget widget-categories">
								<h3 class="widget-title">Categories</h3>
								<ul>
									<li><a href="blog-large-image.html">Business Visa <span>2</span></a></li>
									<li><a href="blog-large-image.html">Education Visa <span>1</span></a></li>
									<li><a href="blog-large-image.html">Immigration Visa <span>3</span></a></li>
									<li><a href="blog-large-image.html">Student Visa <span>1</span></a></li>
									<li><a href="blog-large-image.html">Tourism Visa <span>2</span></a></li>
								</ul>
							</aside>
							<aside class="widget single-visa-bg-img">
								<div class="textwidget">
									<div class="widget_media_image">
										<img src="/vz-public/liviza/assets/images/homepage-1/banner-img.png" class="img-fluid" alt="">
										<div class="content-box">
											<div class="icon-box">
												<i class="pbmit-base-icon-headphone-alt"></i>
											</div>
											<h5>Our Appointment Service call us</h5>
											<div class="phone-box">
												<a href="tel:(000)888.666.88">(000)888.666.88</a>
											</div>
											<div class="arrow-img">
												<img src="/vz-public/liviza/assets/images/homepage-1/arrow-png.png" alt="">
											</div>
										</div>
									</div>
								</div>
							</aside>
							<aside class="widget widget-tag-cloud">
								<h3 class="widget-title">Tags</h3>
								<div class="tagcloud">
									<a href="blog-large-image.html" class="tag-cloud-link">Business</a>
									<a href="blog-large-image.html" class="tag-cloud-link">Education</a>
									<a href="blog-large-image.html" class="tag-cloud-link">Immigration</a>
									<a href="blog-large-image.html" class="tag-cloud-link">Travel</a>
									<a href="blog-large-image.html" class="tag-cloud-link">Visa</a>
								</div>
							</aside>  
						</aside>
					</div>
				</div>
			</div>
		</section>
		<!-- Blog Details End -->
		
		</div>
		<!-- Page Content End -->

        <!-- footer -->
		<footer class="footer site-footer">
			<div class="pbmit-footer-widget-area-top">
				<div class="container">
					<div class="first-footer-inner">
						<div class="row align-items-center">
							<div class="col-md-6">
								<div class="pbmit-footer-boxes">
									<h3 class="footer-title">Sign up to get Latest Updates</h3>
								</div>
							</div>
							<div class="col-md-6">
								<div class="pbmit-footer-boxes">
									<form>
										<input type="email" name="email" placeholder="Your email address" required="">
										<button class="pbmit-btn" type="submit">
											Subscribe
										</button>
									</form>	
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="pbmit-footer-widget-area">
				<div class="container">
					<div class="second-footer-inner">
						<div class="row">
							<div class="col-md-6 col-lg-4">
								<div class="widget"> 
									<div class="textwidget">
										<p>
											<img class="pbmit-footerlogo" src="/vz-public/liviza/assets/images/logo-white.png" alt="">
										</p>
										<p>Liviza provides the simplest solution for processing your all types of visa. Say goodbye to endless hassles and confusions.</p>
									</div>
									<div class="pbmit-social-links-wrapper">
										<ul class="social-icons">
											<li class="pbmit-social-facebook">
												<a class=" tooltip-top" target="_blank" href="#" data-tooltip="Facebook" rel="noopener">
													<i class="pbmit-base-icon-facebook"></i>
												</a>
											</li>
											<li class="pbmit-social-twitter">
												<a class=" tooltip-top" target="_blank" href="#" data-tooltip="Twitter" rel="noopener">
													<i class="pbmit-base-icon-twitter"></i>
												</a>
											</li>
											<li class="pbmit-social-flickr">
												<a class=" tooltip-top" target="_blank" href="#" data-tooltip="Flickr" rel="noopener">
													<i class="pbmit-base-icon-flickr"></i>
												</a>
											</li>
											<li class="pbmit-social-linkedin">
												<a class=" tooltip-top" target="_blank" href="#" data-tooltip="LinkedIn" rel="noopener">
													<i class="pbmit-base-icon-linkedin"></i>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-3">
								<div class="widget">
									<h3 class="widget-title">Information</h3>
									<div class="textwidget">
										<ul>
											<li><a href="/over-ons">About Us</a></li>
											<li><a href="our-team-member.html">Our Team</a></li>
											<li><a href="/contact">Contacts Us</a></li>
											<li><a href="coaching-details.html">Research</a></li>
											<li><a href="coaching-details.html">Research</a></li>
											<li><a href="coaching-details.html">Best Seller</a></li>
											<li><a href="/contact">Help</a></li>
											<li><a href="countries.html">Collections</a></li>
											<li><a href="/diensten">Services</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-2">
								<div class="widget">
									<h3 class="widget-title">Visa</h3>
									<div class="menu-visa">
										<ul>
											<li><a href="/diensten/verblijf/voorbeeld">Students Visa</a></li>
											<li><a href="/diensten/verblijf/voorbeeld">Business Visa</a></li>
											<li><a href="/diensten/verblijf/voorbeeld">Family Visa</a></li>
											<li><a href="/diensten/verblijf/voorbeeld">Travel Visa</a></li>
											<li><a href="/diensten/verblijf/voorbeeld">Work Visa</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-3">
								<div class="widget">
									<h3 class="widget-title">Get in touch</h3>
									<ul class="pbmit_contact_widget_wrapper">
										<li class="pbmit-contact-address  pbmit-base-icon-location-pin">
											<strong>Address</strong><br>201New York 10010, US 			
										</li>
										<li class="pbmit-contact-phonenumber pbmit-base-icon-mobile">
											<strong>Phone</strong><br>(+01) 123 456 7890
										</li>
										<li class="pbmit-contact-envelope pbmit-base-icon-envelope">
											<strong>Email Address</strong><br>info@example.com
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
								<div class="pbmit-footer-left">Copyright © 2023 All Rights Reserved.</div>
							</div>		
							<div class="col-md-7">
								<div class="pbmit-footer-right">
									<ul class="footer-nav-menu">
										<li><a href="/over-ons">About Us</a></li>
										<li><a href="/diensten/verblijf">Privacy policy</a></li>
										<li><a href="/contact">Customer</a></li>
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
	<!-- Page Wrapper End -->

	<!-- Search Box Start Here -->
	<div class="pbmit-search-overlay">
		<div class="pbmit-icon-close"></div>
		<div class="pbmit-search-outer"> 
			<div class="pbmit-search-logo">
				<img src="/vz-public/liviza/assets/images/logo-white.png" class="img-fluid" alt="">
			</div>
			<form class="pbmit-site-searchform">
				<input type="search" class="form-control field searchform-s" name="s" placeholder="Type Word Then Press Enter">
				<button type="submit">
					<i class="pbmit-base-icon-search"></i>
				</button>
			</form>
		</div>
	</div>
	<!-- Search Box End Here -->
 
     <!-- JS
         ============================================ -->
      <!-- jQuery JS -->
      
      <!-- Popper JS -->
      
      <!-- Bootstrap JS -->
       
      <!-- jquery Waypoints JS -->
      
      <!-- jquery Appear JS -->
      
      <!-- Numinate JS -->
      
      <!-- Swiper JS -->
      
      <!-- Magnific JS -->
      
      <!-- Circle Progress JS -->
        
      <!-- Scripts JS -->
            

	`;
