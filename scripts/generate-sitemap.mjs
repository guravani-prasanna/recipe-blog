import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Using the same mock data as api.ts since we can't reliably import TS in this plain JS script 
// without setting up ts-node, and this is just for the task.
const MOCK_DATA = {
  en: ['classic-spanish-paella', 'french-onion-soup', 'quick-margherita-pizza', 'spaghetti-carbonara'],
};

async function generateSitemap() {
  const baseUrl = 'http://localhost:3000'; // In a real app, use the actual domain
  const locales = ['en', 'es', 'fr'];
  const defaultLocale = 'en';

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add homepage
  locales.forEach((loc) => {
    const url = loc === defaultLocale ? `${baseUrl}` : `${baseUrl}/${loc}`;
    sitemap += `
  <url>
    <loc>${url}</loc>
  </url>`;
  });

  // Add recipes index
  locales.forEach((loc) => {
    const url = loc === defaultLocale ? `${baseUrl}/recipes` : `${baseUrl}/${loc}/recipes`;
    sitemap += `
  <url>
    <loc>${url}</loc>
  </url>`;
  });

  // Add individual recipes
  const slugs = MOCK_DATA.en;
  slugs.forEach((slug) => {
    locales.forEach((loc) => {
      const url = loc === defaultLocale ? `${baseUrl}/recipes/${slug}` : `${baseUrl}/${loc}/recipes/${slug}`;
      sitemap += `
  <url>
    <loc>${url}</loc>
  </url>`;
    });
  });

  sitemap += '\n</urlset>';

  const path = resolve(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(path, sitemap);
  console.log('Sitemap generated successfully at', path);
}

generateSitemap();
