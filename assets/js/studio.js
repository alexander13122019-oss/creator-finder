(function () {
  "use strict";
  const header = document.querySelector(".studio-header");
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".studio-nav");
  function closeNavigation() { if (!toggle || !navigation) return; toggle.setAttribute("aria-expanded", "false"); navigation.classList.remove("is-open"); }
  if (toggle && navigation) {
    toggle.addEventListener("click", function () { const open = toggle.getAttribute("aria-expanded") === "true"; toggle.setAttribute("aria-expanded", String(!open)); navigation.classList.toggle("is-open", !open); });
    navigation.addEventListener("click", closeNavigation);
    document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeNavigation(); });
  }
  function updateHeader() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 10); }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  document.querySelectorAll("[data-current-year]").forEach(function (node) { node.textContent = String(new Date().getFullYear()); });
  const canonical = document.querySelector("[data-dynamic-canonical]");
  if (canonical && window.location.protocol !== "file:") {
    const path = window.location.pathname.endsWith("index.html") ? window.location.pathname.slice(0, -"index.html".length) : window.location.pathname;
    canonical.href = window.location.origin + path;
  }
  document.querySelectorAll("[data-dynamic-og]").forEach(function (meta) {
    if (window.location.protocol !== "file:") meta.content = new URL(meta.content, window.location.href).href;
  });
  const revealItems = document.querySelectorAll("main > section, .page-hero, .product-hero, .legal-copy");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    revealItems.forEach(function (item) {
      item.classList.add("reveal", "is-reveal-ready");
      observer.observe(item);
    });
  }
})();
