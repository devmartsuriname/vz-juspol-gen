/*
 * VZ Aanvraaghulp — preparation-only step behaviour (LFB-104).
 *
 * Shows one server-rendered step at a time. The only thing stored is the pair
 * of categorical choices (category slug + service slug) in localStorage, for
 * 24 hours. No personal data, no free text, no uploads, no analytics and no
 * network calls of any kind. "Opnieuw beginnen" clears the stored value.
 */
(function () {
  var KEY = "vz-aanvraaghulp";
  var TTL = 24 * 60 * 60 * 1000;

  function read() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.saved !== "number") return null;
      if (Date.now() - parsed.saved > TTL) {
        window.localStorage.removeItem(KEY);
        return null;
      }
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function write(value) {
    try {
      window.localStorage.setItem(
        KEY,
        JSON.stringify({ category: value.category, service: value.service, saved: Date.now() })
      );
    } catch (error) {
      /* storage unavailable — the wizard still works for this visit */
    }
  }

  function clear() {
    try {
      window.localStorage.removeItem(KEY);
    } catch (error) {
      /* ignore */
    }
  }

  function init() {
    var root = document.querySelector("[data-vz-wizard]");
    if (!root || root.__vzReady) return;
    root.__vzReady = true;

    var live = root.querySelector(".vz-wizard-live");
    var steps = root.querySelectorAll(".vz-wizard-step");
    var state = { category: null, service: null };

    function announce(text) {
      if (live) live.textContent = text;
    }

    function focusStep(step) {
      var heading = step.querySelector("h2");
      if (!heading) return;
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: false });
    }

    function show(selector, message, moveFocus) {
      var target = root.querySelector(selector);
      if (!target) return false;
      for (var i = 0; i < steps.length; i += 1) {
        steps[i].hidden = true;
        steps[i].removeAttribute("aria-current");
      }
      target.hidden = false;
      target.setAttribute("aria-current", "step");
      if (message) announce(message);
      if (moveFocus) focusStep(target);
      return true;
    }

    /* FE-001 V-008: reflect the chosen category/service on the choice buttons. */
    function markPressed(attr, value) {
      var buttons = root.querySelectorAll("[" + attr + "]");
      for (var i = 0; i < buttons.length; i += 1) {
        var pressed = buttons[i].getAttribute(attr) === value;
        buttons[i].setAttribute("aria-pressed", pressed ? "true" : "false");
        var card = buttons[i].closest(".vz-wizard-choice");
        if (card) card.classList.toggle("vz-wizard-choice-selected", pressed);
      }
    }

    function showStart(moveFocus) {
      show('[data-vz-step="1"]', "Stap 1 van 3.", moveFocus);
    }

    function showCategory(category, moveFocus) {
      state.category = category;
      markPressed("data-vz-category", category);
      var ok = show(
        '[data-vz-panel="' + category + '"]',
        "Stap 2 van 3.",
        moveFocus
      );
      if (!ok) showStart(moveFocus);
    }

    function showResult(category, service, moveFocus) {
      state.category = category;
      state.service = service;
      markPressed("data-vz-category", category);
      markPressed("data-vz-service", category + "/" + service);
      var ok = show(
        '[data-vz-result="' + category + "/" + service + '"]',
        "Stap 3 van 3. Uw voorbereiding.",
        moveFocus
      );
      if (!ok) showStart(moveFocus);
    }

    root.addEventListener("click", function (event) {
      var button = event.target.closest ? event.target.closest("button") : null;
      if (!button || !root.contains(button)) return;

      var category = button.getAttribute("data-vz-category");
      if (category) {
        showCategory(category, true);
        return;
      }

      var service = button.getAttribute("data-vz-service");
      if (service) {
        var parts = service.split("/");
        showResult(parts[0], parts[1], true);
        write({ category: parts[0], service: parts[1] });
        return;
      }

      var back = button.getAttribute("data-vz-back");
      if (back === "1") {
        showStart(true);
        return;
      }
      if (back === "2" && state.category) {
        showCategory(state.category, true);
        return;
      }

      if (button.classList.contains("vz-wizard-restart")) {
        clear();
        state.category = null;
        state.service = null;
        markPressed("data-vz-category", "");
        markPressed("data-vz-service", "");
        showStart(true);
      }
    });

    var stored = read();
    if (stored && stored.category && stored.service) {
      showResult(stored.category, stored.service, false);
    } else {
      showStart(false);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.vzWizardInit = init;
})();
