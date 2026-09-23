/*
 * VZ public polish behaviour (LFB-103D POLISH 001 CORRECTION, FE-001).
 *
 * The category switcher on /documentenlijsten uses the bundled Bootstrap 5
 * tab component (pointer, touch, ArrowLeft/ArrowRight, Enter/Space).
 * Bootstrap 5.2 does not implement Home/End for tablists, so this file adds
 * only that: it delegates to the native Bootstrap behaviour by activating
 * the first or last tab.
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
 * Mobile menu open state (FE-001 — D-107-002 / V-011).
 *
 * The Liviza template toggles `header.active` from jQuery. That binding is
 * re-attached on every template mount and exposes no ARIA state. This module
 * owns the open state instead: one delegated listener at document level (so
 * it survives template re-mounts), `aria-expanded` kept in sync, Escape closes
 * and returns focus, menu links close the panel, and a resize past the
 * desktop breakpoint resets it. The template listener still runs; the class
 * is therefore set explicitly from the desired state after it, never toggled.
 */
(function () {
  if (window.__vzMenuBound) return;
  window.__vzMenuBound = true;

  var DESKTOP = 1200;

  function header() {
    return document.querySelector("header.site-header");
  }
  function toggler() {
    return document.querySelector("[data-vz-menu-toggle]");
  }

  function setOpen(open, moveFocus) {
    var head = header();
    var button = toggler();
    if (!head || !button) return;
    head.classList.toggle("active", open);
    head.classList.toggle("vz-menu-open", open);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    if (!open && moveFocus) button.focus();
  }

  function isOpen() {
    var head = header();
    return !!(head && head.classList.contains("vz-menu-open"));
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    var button = target && target.closest ? target.closest("[data-vz-menu-toggle]") : null;
    if (button) {
      var next = !isOpen();
      // The template's own handler toggles `header.active` on the same click.
      // Settle the final state after it has run.
      window.setTimeout(function () {
        setOpen(next, false);
      }, 0);
      return;
    }
    if (isOpen()) {
      var link = target && target.closest ? target.closest("#pbmit-menu a") : null;
      if (link) setOpen(false, false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !isOpen()) return;
    event.preventDefault();
    setOpen(false, true);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= DESKTOP && isOpen()) setOpen(false, false);
  });
})();

/*
 * Hero carousel controls, status and lifecycle (D-107-001,
 * MAIN-RELEASE-BASELINE-TRACK-A-001; lifecycle from FE-003).
 *
 * Visible navigation is the template's own pagination dots, which the bundled
 * Swiper 7.3.3 a11y module makes keyboard operable. The "Vorige dia" /
 * "Volgende dia" buttons are the accessible previous/next controls: pointer,
 * Enter and Space all activate them (native <button>), `aria-disabled` marks
 * the first/last slide because the carousel does not loop, and the polite
 * "Dia X van N" status follows the active slide. Autoplay stays off, so
 * nothing moves without a user action and no timer competes with the buttons.
 *
 * The module also destroys the previous Swiper instance when the template
 * scripts re-initialise the hero after a client-side navigation, so no stale
 * instance or handler survives. Buttons are bound once per instance.
 */
(function () {
  if (window.__vzHeroBound) return;
  window.__vzHeroBound = true;

  var current = null;

  function sync(root, swiper) {
    var status = root.querySelector("[data-vz-hero-status]");
    var prev = root.querySelector('[data-vz-hero="prev"]');
    var next = root.querySelector('[data-vz-hero="next"]');
    var total = swiper.slides ? swiper.slides.length : 0;
    var index = swiper.realIndex || 0;
    if (status && total) status.textContent = "Dia " + (index + 1) + " van " + total;
    if (prev) prev.setAttribute("aria-disabled", swiper.isBeginning ? "true" : "false");
    if (next) next.setAttribute("aria-disabled", swiper.isEnd ? "true" : "false");
  }

  function bindButton(root, button, swiper) {
    if (button.__vzSwiper === swiper) return;
    button.__vzSwiper = swiper;
    if (button.__vzHandler) button.removeEventListener("click", button.__vzHandler);
    button.__vzHandler = function (event) {
      event.preventDefault();
      if (button.getAttribute("aria-disabled") === "true") return;
      var active = root.__vzSwiper;
      if (!active || active.destroyed) return;
      if (button.getAttribute("data-vz-hero") === "prev") active.slidePrev();
      else active.slideNext();
      sync(root, active);
    };
    button.addEventListener("click", button.__vzHandler);
  }

  function bind(root) {
    var el = root.querySelector(".swiper-slider");
    var swiper = el && el.swiper;
    if (!swiper) return false;
    if (root.__vzSwiper === swiper) return true;

    // A new instance exists for this carousel: retire the previous one so no
    // stale instance, listener or transition survives a client-side navigation.
    if (current && current !== swiper && !current.destroyed) {
      try {
        current.destroy(true, false);
      } catch (error) {
        /* an already-detached instance is fine */
      }
    }

    root.__vzSwiper = swiper;
    current = swiper;
    swiper.on("slideChange", function () {
      sync(root, swiper);
    });
    swiper.on("transitionEnd", function () {
      sync(root, swiper);
    });
    root.querySelectorAll("[data-vz-hero]").forEach(function (button) {
      bindButton(root, button, swiper);
    });
    sync(root, swiper);
    return true;
  }

  function tick() {
    var root = document.querySelector(".vz-hero-carousel");
    if (root) bind(root);
  }

  tick();
  var tries = 0;
  var timer = window.setInterval(function () {
    tries += 1;
    tick();
    if (tries > 60) window.clearInterval(timer);
  }, 150);

  // Re-bind after template re-mounts (client-side navigation back to `/`).
  var observer = new MutationObserver(function () {
    tick();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
