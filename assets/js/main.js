(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        navToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        navToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        navToggle.focus();
      }
    });
  }

  document.querySelectorAll("[data-screenshot]").forEach(function (media) {
    const image = media.querySelector("img");
    if (!image) return;

    function showImage() {
      media.classList.add("has-image");
    }

    function showPlaceholder() {
      media.classList.remove("has-image");
    }

    image.addEventListener("load", showImage);
    image.addEventListener("error", showPlaceholder);
    if (image.complete && image.naturalWidth > 0) showImage();
  });

  const languageButtons = document.querySelectorAll("[data-language-option]");
  const languageSections = document.querySelectorAll("[data-language-content]");

  function setLanguage(language) {
    languageButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.languageOption === language)
      );
    });

    languageSections.forEach(function (section) {
      section.hidden = section.dataset.languageContent !== language;
    });

    document.documentElement.lang = language;
    try {
      sessionStorage.setItem("creator-finder-legal-language", language);
    } catch (_error) {
      // The language switch still works if browser storage is unavailable.
    }
  }

  if (languageButtons.length && languageSections.length) {
    let initialLanguage = "es";
    try {
      initialLanguage = sessionStorage.getItem("creator-finder-legal-language") || "es";
    } catch (_error) {
      initialLanguage = "es";
    }

    if (!document.querySelector(`[data-language-content="${initialLanguage}"]`)) {
      initialLanguage = "es";
    }

    setLanguage(initialLanguage);
    languageButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setLanguage(button.dataset.languageOption);
      });
    });
  }
})();
