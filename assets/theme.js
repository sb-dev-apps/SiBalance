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

    Array.prototype.slice.call(document.querySelectorAll(".theme-toggle")).forEach(function (button) {
      var label = nextTheme === "light" ? "Light" : "Dark";
      button.setAttribute("aria-pressed", nextTheme === "light" ? "true" : "false");

      var text = button.querySelector(".theme-toggle-text");
      if (text) {
        text.textContent = label;
      }
    });
  }

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
      return;
    }

    callback();
  }

  applyTheme(storedTheme() || "dark");

  document.addEventListener("click", function (event) {
    var button = event.target.closest ? event.target.closest(".theme-toggle") : null;
    if (!button) {
      return;
    }

    var nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });

  ready(function () {
    applyTheme(storedTheme() || root.dataset.theme || "dark");
  });
}());
