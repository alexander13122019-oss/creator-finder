(function () {
  "use strict";

  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");

  function closeNavigation() {
    if (!toggle || !navigation) return;
    toggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }

  if (toggle && navigation) {
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      navigation.classList.toggle("is-open", !open);
    });
    navigation.addEventListener("click", closeNavigation);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNavigation();
    });
  }

  document.querySelectorAll("img[data-fallback-target]").forEach(function (image) {
    image.addEventListener("error", function () {
      image.hidden = true;
      const fallback = document.querySelector(image.dataset.fallbackTarget);
      if (fallback) fallback.hidden = false;
    });
  });
}());

