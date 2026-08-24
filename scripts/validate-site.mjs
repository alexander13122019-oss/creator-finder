import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const errors = [];
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith(".html")) htmlFiles.push(fullPath);
  }
}

function localTarget(fromFile, reference) {
  if (!reference || reference.startsWith("#") || reference.startsWith("mailto:") || reference.startsWith("tel:")) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(reference) || reference.startsWith("//")) return null;
  const clean = decodeURIComponent(reference.split("#")[0].split("?")[0]);
  if (!clean) return null;
  const target = path.resolve(path.dirname(fromFile), clean);
  return fs.existsSync(target) && fs.statSync(target).isDirectory() ? path.join(target, "index.html") : target;
}

walk(root);

for (const file of htmlFiles) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  const source = fs.readFileSync(file, "utf8");
  if (!/<title(?:\s[^>]*)?>[^<]+<\/title>/i.test(source)) errors.push(`${relative}: missing title`);
  if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(source)) errors.push(`${relative}: missing meta description`);
  if (!/<meta\s+name="viewport"/i.test(source)) errors.push(`${relative}: missing viewport meta`);
  if (!/<h1(?:\s|>)/i.test(source)) errors.push(`${relative}: missing h1`);

  for (const match of source.matchAll(/\b(?:href|src)="([^"]*)"/gi)) {
    const reference = match[1];
    const target = localTarget(file, reference);
    if (target && !fs.existsSync(target)) errors.push(`${relative}: broken local reference ${reference}`);
  }

  for (const match of source.matchAll(/href="#([^"]+)"/gi)) {
    if (!new RegExp(`id=["']${match[1]}["']`).test(source)) errors.push(`${relative}: missing fragment #${match[1]}`);
  }
}

const requiredRoutes = [
  "index.html", "apps/index.html", "apps/later/index.html", "apps/later/privacy/index.html", "apps/later/support/index.html",
  "apps/soundscape/index.html", "apps/soundscape/privacy/index.html", "apps/soundscape/support/index.html",
  "games/index.html", "games/noxen/index.html", "tools/index.html", "tools/creator-finder/index.html",
  "support/index.html", "contact/index.html", "privacy/index.html", "terms/index.html",
  "privacy/daily3/index.html", "privacy/one-line/index.html", "privacy/water-today/index.html",
  "privacy/habit-one/index.html", "privacy/fuel-log/index.html", "privacy/focus-25/index.html",
  "privacy/routine-check/index.html", "privacy/expiry-keeper/index.html", "privacy/quick-spend/index.html",
  "privacy/no-spend/index.html", "privacy/mood-today/index.html", "privacy/one-photo/index.html",
  "apps/daily3/index.html", "apps/one-line/index.html", "apps/water-today/index.html",
  "apps/habit-one/index.html", "apps/fuel-log/index.html", "apps/focus-25/index.html",
  "apps/routine-check/index.html", "apps/expiry-keeper/index.html", "apps/quick-spend/index.html",
  "apps/no-spend/index.html", "apps/mood-today/index.html", "apps/one-photo/index.html",
  "privacy.html", "terms.html", "audit.html", "contact.html"
];

for (const route of requiredRoutes) {
  if (!fs.existsSync(path.join(root, route))) errors.push(`missing required route: ${route}`);
}

const androidPrivacyPolicies = [
  ["daily3", "Daily 3"], ["one-line", "One Line"], ["water-today", "Water Today"],
  ["habit-one", "Habit One"], ["fuel-log", "Fuel Log"], ["focus-25", "Focus 25"],
  ["routine-check", "Routine Check"], ["expiry-keeper", "Expiry Keeper"],
  ["quick-spend", "Quick Spend"], ["no-spend", "No Spend"],
  ["mood-today", "Mood Today"], ["one-photo", "One Photo"]
];

const privacyCentre = fs.readFileSync(path.join(root, "privacy/index.html"), "utf8");
for (const [slug, appName] of androidPrivacyPolicies) {
  const policy = fs.readFileSync(path.join(root, `privacy/${slug}/index.html`), "utf8");
  if (!policy.includes(`<title>${appName} Privacy Policy | XOTOX STUDIO</title>`)) {
    errors.push(`privacy/${slug}/index.html: incorrect title`);
  }
  if (!policy.includes(`content="Privacy Policy for ${appName} by XOTOX STUDIO."`)) {
    errors.push(`privacy/${slug}/index.html: incorrect meta description`);
  }
  if (!privacyCentre.includes(`href="${slug}/"`)) {
    errors.push(`privacy/index.html: missing link to ${slug}`);
  }
  const appPage = fs.readFileSync(path.join(root, `apps/${slug}/index.html`), "utf8");
  if (!appPage.includes(`<title>${appName} | XOTOX STUDIO</title>`)) {
    errors.push(`apps/${slug}/index.html: incorrect title`);
  }
  if (!appPage.includes(`href="../../privacy/${slug}/"`)) {
    errors.push(`apps/${slug}/index.html: incorrect privacy link`);
  }
  if (!appPage.includes('href="../../support/"')) {
    errors.push(`apps/${slug}/index.html: missing support link`);
  }
  const sectionNumbers = [...policy.matchAll(/<h2>(\d+)\./g)].map((match) => Number(match[1]));
  if (sectionNumbers.some((number, index) => number !== index + 1)) {
    errors.push(`privacy/${slug}/index.html: non-sequential policy sections`);
  }
}

const appsIndex = fs.readFileSync(path.join(root, "apps/index.html"), "utf8");
const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const [slug, appName] of androidPrivacyPolicies) {
  if (!appsIndex.includes(`href="${slug}/"`) || !appsIndex.includes(`<h2>${appName}</h2>`)) {
    errors.push(`apps/index.html: missing ${appName}`);
  }
}
for (const featured of ["apps/later/", "apps/soundscape/", "apps/daily3/", "apps/water-today/", "apps/one-photo/", "apps/quick-spend/"]) {
  if (!home.includes(`href="${featured}"`)) errors.push(`index.html: missing featured app ${featured}`);
}
if (!home.includes('href="apps/">View all apps')) errors.push("index.html: missing View all apps CTA");

if (!privacyCentre.includes("<h1 class=\"page-title\">Privacy Policies</h1>")) {
  errors.push("privacy/index.html: missing Privacy Policies heading");
}

const criticalChecks = [
  ["privacy.html", "Google Workspace scopes will adhere to the Google User Data Policy, including the Limited Use requirements"],
  ["privacy.html", "https://www.googleapis.com/auth/gmail.compose"],
  ["privacy.html", "https://www.googleapis.com/auth/gmail.readonly"],
  ["privacy.html", "no later than 30 days"],
  ["terms.html", "gmail.compose"],
  ["terms.html", "gmail.readonly"],
  ["audit.html", "YouTube Data API v3"],
  ["contact.html", "xotoxoficial@gmail.com"],
  ["apps/later/privacy/index.html", "com.xotoxstudio.later"],
  ["apps/later/privacy/index.html", "later_pro"],
  ["apps/soundscape/privacy/index.html", "com.xotoxstudio.soundscape"],
  ["apps/soundscape/privacy/index.html", "soundscape_pro"],
  ["apps/soundscape/privacy/index.html", "does not currently use Firebase Analytics or Firebase Crashlytics"],
  ["privacy/daily3/index.html", "com.xotoxstudio.daily3"],
  ["privacy/one-line/index.html", "com.xotoxstudio.oneline"],
  ["privacy/water-today/index.html", "com.xotoxstudio.watertoday"],
  ["privacy/habit-one/index.html", "com.xotoxstudio.habitone"],
  ["privacy/fuel-log/index.html", "com.xotoxstudio.fuellog"],
  ["privacy/focus-25/index.html", "com.xotoxstudio.focus25"],
  ["privacy/routine-check/index.html", "com.xotoxstudio.routinecheck"],
  ["privacy/expiry-keeper/index.html", "com.xotoxstudio.expirykeeper"],
  ["privacy/quick-spend/index.html", "com.xotoxstudio.quickspend"],
  ["privacy/no-spend/index.html", "com.xotoxstudio.nospend"],
  ["privacy/mood-today/index.html", "com.xotoxstudio.moodtoday"],
  ["privacy/one-photo/index.html", "com.xotoxstudio.onephoto"],
  ["privacy/index.html", "Privacy Policies"]
];

for (const [file, marker] of criticalChecks) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  if (!source.includes(marker)) errors.push(`${file}: critical marker missing: ${marker}`);
}

const allText = htmlFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
for (const forbidden of ["[CONTACT_EMAIL]", "[PON AQUÍ TU EMAIL]", "SCREENSHOT PENDING", "href=\"#\""]) {
  if (allText.includes(forbidden)) errors.push(`forbidden placeholder found: ${forbidden}`);
}

const projects = JSON.parse(fs.readFileSync(path.join(root, "data/projects.json"), "utf8"));
for (const project of projects) {
  if (!fs.existsSync(path.join(root, project.route, "index.html"))) errors.push(`project route missing: ${project.route}`);
}

for (const icon of ["later-icon.webp", "soundscape-icon.webp", "noxen-icon.webp"]) {
  if (!fs.existsSync(path.join(root, "assets/images/projects", icon))) errors.push(`missing real project icon: ${icon}`);
}

for (const forbiddenAsset of [
  "assets/images/xotox-social.png",
  "assets/images/xotox-mark.svg",
  "assets/images/projects/noxen-feature.webp",
  "assets/images/projects/noxen-hero.webp",
  "assets/images/projects/noxen-hall.webp",
  "assets/images/projects/noxen-door-wide.webp",
  "assets/images/projects/noxen-title.webp"
]) {
  if (allText.includes(path.basename(forbiddenAsset))) errors.push(`forbidden visual reference found: ${forbiddenAsset}`);
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
if (siteUrl) {
  const routes = htmlFiles.map((file) => {
    const relative = path.relative(root, file).replaceAll("\\", "/");
    return relative.endsWith("/index.html") ? relative.slice(0, -"index.html".length) : relative === "index.html" ? "" : relative;
  }).sort();
  const body = routes.map((route) => `  <url><loc>${siteUrl}/${route}</loc></url>`).join("\n");
  fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
  console.log(`Generated sitemap.xml for ${siteUrl}`);
} else {
  console.log("SITE_URL not set; sitemap generation is ready but intentionally skipped.");
}

console.log(`Validated ${htmlFiles.length} HTML pages, ${requiredRoutes.length} required routes, and ${projects.length} projects.`);
