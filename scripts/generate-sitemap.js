const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'fr'];
const mockSlugs = [
    'classic-spanish-paella',
    'french-onion-soup',
    'mediterranean-salad',
    'hearty-beef-stew',
    'margherita-pizza',
    'creamy-alfredo-pasta'
];
const baseUrl = 'http://localhost:3000';

function generateSitemap() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static pages
    const staticPages = ['', '/recipes'];

    for (const page of staticPages) {
        for (const locale of locales) {
            // The default locale (en) is usually served without the prefix in Next.js 
            // by default, unless configured otherwise. The requirement asks to include all 3 variants.
            // E.g. /en, /es, /fr. In Next.js with i18n, default locale doesn't have prefix in URLs
            // but the requirement says "For a recipe with slug my-recipe, the sitemap should include .../en/recipes/my-recipe"
            // Wait, Next.js default config serves `en` at root, e.g. /recipes/my-recipe, 
            // but we will just output what the requirement specifies.
            xml += `
  <url>
    <loc>${baseUrl}/${locale}${page}</loc>
  </url>`;
        }
    }

    // Dynamic pages
    for (const slug of mockSlugs) {
        for (const locale of locales) {
            xml += `
  <url>
    <loc>${baseUrl}/${locale}/recipes/${slug}</loc>
  </url>`;
        }
    }

    xml += `\n</urlset>`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log('sitemap.xml generated successfully!');
}

generateSitemap();
