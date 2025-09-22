import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.VITE_PUBLIC_SITE_URL || 'https://www.shopacc.pro.vn';

// Products data synced with src/data/products.ts
const products = [
  { id: "chatgpt-plus-3m", slug: "chatgpt-plus-3-thang-tai-khoan-chinh-chu", name: "ChatGPT Plus 3 tháng - Đăng ký lần đầu", image: "/src/assets/chatgpt-3m.png" },
  { id: "chatgpt-plus-6m", slug: "chatgpt-plus-6-thang-tai-khoan-chinh-chu", name: "ChatGPT Plus 6 tháng - Đăng ký lần đầu", image: "/src/assets/chatgpt-6m.png" },
  { id: "chatgpt-plus-share", slug: "chatgpt-plus-1-thang-tai-khoan-share", name: "ChatGPT Plus 1 tháng - TK share", image: "/src/assets/chatgpt-share.png" },
  { id: "youtube-premium-1y", slug: "youtube-premium-1-nam", name: "YouTube Premium 1 năm + Music", image: "/src/assets/youtube-1y.png" },
  { id: "youtube-premium-6m", slug: "youtube-premium-6-thang", name: "YouTube Premium 6 tháng + Music", image: "/src/assets/youtube-6m.png" },
  { id: "duolingo-super", slug: "duolingo-super-1-nam", name: "Duolingo Super 1 năm - TK chính chủ", image: "/src/assets/douligo-1y.png" },
  { id: "spotify-premium-3-thang", slug: "spotify-premium-3-thang", name: "Spotify Premium 3 tháng - TK chính chủ", image: "/src/assets/spotify-3m.png" },
  { id: "spotify-premium-6-thang", slug: "spotify-premium-6-thang", name: "Spotify Premium 6 tháng - TK chính chủ", image: "/src/assets/spotify-6m.png" },
  { id: "spotify-premium", slug: "spotify-premium-1-nam", name: "Spotify Premium 1 năm - TK chính chủ", image: "/src/assets/spotify-1y.png" },
  { id: "claude-1m", slug: "claude-1m", name: "Claude Pro 20$ 1 tháng - TK chính chủ", image: "/src/assets/claude-1m.png" },
  { id: "capcut-1m", slug: "capcut-1m", name: "CapCut Pro 1 tháng", image: "/src/assets/capcut-1m.png" },
  { id: "capcut-1y", slug: "capcut-1y", name: "CapCut Pro 1 năm", image: "/src/assets/capcut-1y.png" },
  { id: "netflix-1m", slug: "netflix-1m", name: "Netflix 1 tháng - TK chính chủ", image: "/src/assets/netflix-1m.png" },
  { id: "grok-1m", slug: "grok-1m", name: "SuperGrok 1 tháng - TK chính chủ", image: "/src/assets/grok-1m.png" },
  { id: "google-one-2tb-1m", slug: "google-one-2tb-1-thang", name: "Google One 2TB 1 tháng + Gemini Pro", image: "/src/assets/google-one-2tb-1y.png" },
  { id: "google-one-2tb-1y", slug: "google-one-2tb-1-nam", name: "Google One 2TB 1 năm + Gemini Pro", image: "/src/assets/google-one-2tb-1y.png" },
  { id: "perplexity-pro-12m", slug: "perplexity-pro-12m", name: "Perplexity Pro 12 tháng - TK chính chủ", image: "/src/assets/perplexity-pro-12m.png" },
  { id: "microsoft-1y", slug: "microsoft-1y", name: "Microsoft 1 năm - TK chính chủ", image: "/src/assets/microsoft-1y.png" },
];

const generateSitemap = () => {
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Add product pages
  products.forEach(product => {
    sitemap += `
  <url>
    <loc>${SITE_URL}/product/${product.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${SITE_URL}${product.image}</image:loc>
      <image:title>${product.name}</image:title>
    </image:image>
  </url>`;
  });

  // Add other pages
  const otherPages = [
    { url: '/search', priority: '0.8' },
    { url: '/recruitment', priority: '0.7' },
    { url: '/contact', priority: '0.6' },
    { url: '/privacy', priority: '0.3' },
    { url: '/terms', priority: '0.3' }
  ];

  otherPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Write sitemap to public directory
const sitemapContent = generateSitemap();
const publicDir = path.join(__dirname, '../public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);

console.log('✅ Sitemap generated successfully!');
console.log(`📍 Site URL: ${SITE_URL}`);
console.log(`📄 Sitemap saved to: ${path.join(publicDir, 'sitemap.xml')}`);
