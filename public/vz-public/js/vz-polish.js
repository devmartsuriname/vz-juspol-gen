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
