(function () {
  var storageKey = "sibalance-theme";
  var root = document.documentElement;

  function storedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function applyTheme(theme) {
    var nextTheme = theme === "light" ? "light" : "dark";
    root.dataset.theme = nextTheme;

    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      var label = nextTheme === "light" ? "Light" : "Dark";
      button.setAttribute("aria-pressed", nextTheme === "light" ? "true" : "false");

      var text = button.querySelector(".theme-toggle-text");
      if (text) {
        text.textContent = label;
      }
    });
  }

  applyTheme(storedTheme() || "dark");

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(storedTheme() || root.dataset.theme || "dark");

    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      button.addEventListener("click", function () {
        var nextTheme = root.dataset.theme === "light" ? "dark" : "light";
        applyTheme(nextTheme);
        saveTheme(nextTheme);
      });
    });
  });
}());
