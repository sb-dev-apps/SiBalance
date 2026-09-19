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
    var markPath = "/assets/sibalance-logo-" + nextTheme + "-96.png?v=20260914";
    var faviconPath = "/assets/sibalance-logo-" + nextTheme + "-64.png?v=20260914";
    root.dataset.theme = nextTheme;

    Array.prototype.slice.call(document.querySelectorAll(".app-mark")).forEach(function (image) {
      image.setAttribute("src", markPath);
    });

    Array.prototype.slice.call(document.querySelectorAll('link[rel~="icon"]')).forEach(function (link) {
      link.setAttribute("href", faviconPath);
    });

    Array.prototype.slice.call(document.querySelectorAll(".theme-toggle")).forEach(function (button) {
      var label = nextTheme === "light" ? "Dark" : "Light";
      button.setAttribute("aria-pressed", nextTheme === "light" ? "true" : "false");
      button.setAttribute("aria-label", "Switch to " + label.toLowerCase() + " theme");
      button.setAttribute("title", "Switch to " + label.toLowerCase() + " theme");

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
