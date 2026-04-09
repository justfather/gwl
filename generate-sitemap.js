import fs from 'fs';
import path from 'path';

// read posts
const postsDir = path.resolve('./src/posts');
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const urls = [
  '/',
  '/wheel',
  '/bottle',
  '/dice',
  '/cards',
  '/blog',
  '/about'
];

postFiles.forEach(file => {
  const id = file.replace('.md', '');
  urls.push(`/blog/${id}`);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>https://gwl.vercel.app${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap.trim());
console.log('Sitemap generated!');
