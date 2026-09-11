/*
 * VZ public polish behaviour (LFB-103D POLISH 001 CORRECTION).
 *
 * The category switcher on /documentenlijsten uses the bundled Bootstrap 5
 * tab component (pointer, touch, ArrowLeft/ArrowRight, Enter/Space).
 * Bootstrap 5.2 does not implement Home/End for tablists, so this file adds
 * only that: it delegates to the native Bootstrap behaviour by activating
 * the first or last tab. No other behaviour is defined here.
 */
(function () {
  if (window.__vzTabHomeEnd) return;
  window.__vzTabHomeEnd = true;

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Home" && event.key !== "End") return;

    var target = event.target;
    var tab = target && target.closest ? target.closest('[role="tab"]') : null;
    if (!tab) return;

    var list = tab.closest('[role="tablist"]');
    if (!list) return;

    var tabs = list.querySelectorAll('[role="tab"]');
    if (!tabs.length) return;

    var next = event.key === "Home" ? tabs[0] : tabs[tabs.length - 1];
    event.preventDefault();
    next.click();
    next.focus();
  });
})();

/*
 * Hero carousel accessibility (LFB-104 REMEDIATION 001).
 *
 * The homepage hero shows no visible controls and never autoplays. Pointer and
 * touch users drag; keyboard and screen-reader users get the visually hidden
 * previous/next buttons below, plus a polite "Dia X van N" status.
 */
(function () {
  function bind() {
    var root = document.querySelector(".vz-hero-carousel");
    if (!root || root.__vzHeroBound) return false;

    var el = root.querySelector(".swiper-slider");
    var swiper = el && el.swiper;
    if (!swiper) return false;

    root.__vzHeroBound = true;

    var status = root.querySelector("[data-vz-hero-status]");
    var total = swiper.slides ? swiper.slides.length : 0;

    function announce() {
      if (!status || !total) return;
      status.textContent = "Dia " + (swiper.realIndex + 1) + " van " + total;
    }

    root.querySelectorAll("[data-vz-hero]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (button.getAttribute("data-vz-hero") === "prev") {
          swiper.slidePrev();
        } else {
          swiper.slideNext();
        }
      });
    });

    swiper.on("slideChange", announce);
    announce();
    return true;
  }

  if (bind()) return;
  var tries = 0;
  var timer = setInterval(function () {
    tries += 1;
    if (bind() || tries > 40) clearInterval(timer);
  }, 150);
})();
