/*
 * VZ public polish behaviour (LFB-103D POLISH 001).
 *
 * Isolated public-scope script. Adds keyboard-accessible tab behaviour for
 * the document category tabs. Delegated and idempotent so it survives the
 * template script rehydration on client-side navigation.
 */
(function () {
  if (window.__vzPolishBound) return;
  window.__vzPolishBound = true;

  function tabsOf(tab) {
    var list = tab.closest('[role="tablist"]');
    return list ? Array.prototype.slice.call(list.querySelectorAll('[role="tab"]')) : [];
  }

  function select(tab) {
    var tabs = tabsOf(tab);
    tabs.forEach(function (item) {
      var selected = item === tab;
      item.setAttribute("aria-selected", selected ? "true" : "false");
      item.setAttribute("tabindex", selected ? "0" : "-1");
      var panel = document.getElementById(item.getAttribute("aria-controls") || "");
      if (panel) panel.hidden = !selected;
    });
    tab.focus();
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    var tab = target && target.closest ? target.closest('[role="tab"]') : null;
    if (!tab) return;
    event.preventDefault();
    select(tab);
  });

  document.addEventListener("keydown", function (event) {
    var target = event.target;
    var tab = target && target.closest ? target.closest('[role="tab"]') : null;
    if (!tab) return;

    var tabs = tabsOf(tab);
    var index = tabs.indexOf(tab);
    var next = null;

    if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
    else if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
    else if (event.key === "Home") next = tabs[0];
    else if (event.key === "End") next = tabs[tabs.length - 1];

    if (next) {
      event.preventDefault();
      select(next);
    }
  });
})();
