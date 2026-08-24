(function () {
  "use strict";
  const products = window.XOTOX_PRODUCTS || [];
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, function (char) { return ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[char]; }); }
  function imageMarkup(product, root, className) {
    return '<span class="' + className + ' product-image-frame"><img src="' + root + product.image + '" alt="' + escapeHtml(product.name) + ' app icon" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="asset-fallback" hidden>Image pending</span></span>';
  }
  document.querySelectorAll("[data-products-grid]").forEach(function (grid) {
    const root = grid.dataset.root || "";
    const requested = (grid.dataset.products || "").split(",").filter(Boolean);
    const selected = requested.length ? requested.map(function (id) { return products.find(function (product) { return product.id === id; }); }).filter(Boolean) : products;
    const home = grid.classList.contains("ref-app-grid");
    grid.innerHTML = selected.map(function (product) {
      if (home) return '<a class="ref-app-card" href="' + root + 'apps/' + product.slug + '/">' + imageMarkup(product, root, "ref-app-image") + '<h3>' + escapeHtml(product.name) + '</h3><p>' + escapeHtml(product.shortDescription) + '</p><small>Android</small></a>';
      return '<a class="listing-card" href="' + product.slug + '/"><div>' + imageMarkup(product, root, "listing-app-image") + '<h2>' + escapeHtml(product.name) + '</h2><p>' + escapeHtml(product.shortDescription) + '</p><span class="project-type">Android</span></div><span class="card-link">View ' + escapeHtml(product.name) + ' <b>↗</b></span></a>';
    }).join("");
  });
  document.querySelectorAll("[data-hero-product]").forEach(function (card) {
    const product = products.find(function (item) { return item.id === card.dataset.heroProduct; });
    if (!product) return;
    const root = card.dataset.root || "";
    card.href = root + "apps/" + product.slug + "/";
    card.innerHTML = imageMarkup(product, root, "stack-app-image") + "<b>" + escapeHtml(product.name) + "</b>";
  });
  const page = document.querySelector("[data-product-page]");
  if (page) {
    const product = products.find(function (item) { return item.slug === page.dataset.productPage; });
    const root = page.dataset.root || "../../";
    if (!product) return;
    document.title = product.name + " | XOTOX STUDIO";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = product.shortDescription;
    document.querySelectorAll("[data-product-name]").forEach(function (node) { node.textContent = product.name; });
    document.querySelectorAll("[data-product-short]").forEach(function (node) { node.textContent = product.shortDescription; });
    document.querySelectorAll("[data-product-long]").forEach(function (node) { node.textContent = product.longDescription; });
    document.querySelectorAll("[data-product-category]").forEach(function (node) { node.textContent = product.category; });
    const icon = document.querySelector("[data-product-image]");
    if (icon) icon.innerHTML = imageMarkup(product, root, "detail-app-image");
    const actions = document.querySelector("[data-product-actions]");
    if (actions) {
      const play = product.playStoreUrl ? '<a class="button primary" href="' + product.playStoreUrl + '" target="_blank" rel="noopener noreferrer">Google Play <span>↗</span></a>' : "";
      actions.innerHTML = play + '<a class="button quiet" href="' + root + product.privacyPath + '">Privacy policy</a><a class="button quiet" href="' + root + product.supportPath + '">Support</a><a class="button quiet" href="../">Back to Apps</a>';
    }
    const features = document.querySelector("[data-product-features]");
    if (features) features.innerHTML = product.features.length ? product.features.map(function (feature) { return "<article><h3>" + escapeHtml(feature) + "</h3></article>"; }).join("") : '<p class="product-empty-state">Detailed feature information has not been provided yet.</p>';
  }
}());

