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
