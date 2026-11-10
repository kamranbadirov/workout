(function () {
  var KEY = "kinetic-theme";
  var MODE_KEY = "kinetic-mode";
  var THEMES = ["gentler", "kinetic", "things"];
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  var saved = read(KEY);
  var current = THEMES.indexOf(saved) !== -1 ? saved : "gentler";
  var savedMode = read(MODE_KEY);
  var mode =
    savedMode === "dark" || savedMode === "light"
      ? savedMode
      : media && media.matches
        ? "dark"
        : "light";

  root.dataset.theme = current;
  root.dataset.mode = mode;

  if (media && media.addEventListener) {
    media.addEventListener("change", function (e) {
      if (read(MODE_KEY)) return;
      mode = e.matches ? "dark" : "light";
      root.dataset.mode = mode;
      markMode();
    });
  }

  function markActive() {
    document.querySelectorAll("[data-theme-option]").forEach(function (btn) {
      var on = btn.dataset.themeOption === current;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function markMode() {
    document.querySelectorAll("[data-mode-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
    });
  }

  function setTheme(name) {
    current = name;
    root.dataset.theme = name;
    write(KEY, name);
    markActive();
  }

  function toggleMode() {
    mode = mode === "dark" ? "light" : "dark";
    root.dataset.mode = mode;
    write(MODE_KEY, mode);
    markMode();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-theme-option]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTheme(btn.dataset.themeOption);
      });
    });
    document.querySelectorAll("[data-mode-toggle]").forEach(function (btn) {
      btn.addEventListener("click", toggleMode);
    });
    markActive();
    markMode();
  });
})();
