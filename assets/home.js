(function () {
  var menuButton = document.querySelector(".menu-toggle");
  var navigation = document.querySelector(".landing-navigation");

  if (!menuButton || !navigation) {
    return;
  }

  function setMenu(open) {
    navigation.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  }

  menuButton.addEventListener("click", function () {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuButton.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
      setMenu(false);
    }
  });
}());

(function () {
  var hero = document.querySelector(".hero-section");
  var heroCopy = document.querySelector(".hero-copy");
  var heroVisual = document.querySelector(".hero-visual");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var mobileLayout = window.matchMedia("(max-width: 760px)");
  var frameRequested = false;

  if (!hero || !heroCopy || !heroVisual || reducedMotion.matches) {
    return;
  }

  function clamp(value) {
    return Math.min(1, Math.max(0, value));
  }

  function setFade(element, progress, shiftProperty, opacityProperty) {
    element.style.setProperty(opacityProperty, String(1 - progress));
    element.style.setProperty(shiftProperty, (-18 * progress) + "px");
  }

  function updateFade() {
    var scrollTop = window.scrollY;
    var copyProgress;
    var visualProgress;

    if (mobileLayout.matches) {
      var visualTop = heroVisual.getBoundingClientRect().top + scrollTop;
      var visualStart = Math.max(280, visualTop - 120);

      copyProgress = clamp(scrollTop / Math.max(360, heroCopy.offsetHeight * 0.9));
      visualProgress = clamp((scrollTop - visualStart) / Math.max(260, heroVisual.offsetHeight * 0.9));
    } else {
      var fadeDistance = Math.max(420, hero.offsetHeight * 0.72);

      copyProgress = clamp(scrollTop / fadeDistance);
      visualProgress = clamp((scrollTop - 40) / fadeDistance);
    }

    setFade(heroCopy, copyProgress, "--hero-copy-shift", "--hero-copy-opacity");
    setFade(heroVisual, visualProgress, "--hero-visual-shift", "--hero-visual-opacity");
    frameRequested = false;
  }

  function requestFadeUpdate() {
    if (!frameRequested) {
      window.requestAnimationFrame(updateFade);
      frameRequested = true;
    }
  }

  updateFade();
  window.addEventListener("scroll", requestFadeUpdate, { passive: true });
  window.addEventListener("resize", requestFadeUpdate);
}());
