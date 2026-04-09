import fs from 'fs';
import path from 'path';
import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
app.use(express.static('dist'));
const port = 3001;

const server = app.listen(port, async () => {
    console.log(`Prerender server running on port ${port}`);

    try {
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        const page = await browser.newPage();

        // Get urls from posts
        const postsDir = path.resolve('./src/posts');
        const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
        
        const urls = ['/', '/wheel', '/bottle', '/dice', '/cards', '/blog', '/about'];
        postFiles.forEach(file => urls.push(`/blog/${file.replace('.md', '')}`));

        for (const url of urls) {
            console.log(`Prerendering ${url}...`);
            // Add a small delay for animations to settle if needed, but networkidle0 is usually enough
            await page.goto(`http://localhost:${port}${url}`, { waitUntil: 'networkidle0', timeout: 30000 });
            
            // Wait an extra second for React to fully hydration/render
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const html = await page.content();
            
            // Save html
            let targetPath = path.join('dist', url);
            if (url === '/') {
                targetPath = path.join('dist', 'index.html');
            } else {
                fs.mkdirSync(targetPath, { recursive: true });
                targetPath = path.join(targetPath, 'index.html');
            }
            
            fs.writeFileSync(targetPath, html);
        }

        await browser.close();
        console.log('Prerendering completed.');
    } catch (e) {
        console.error('Error during prerender:', e);
        process.exitCode = 1;
    } finally {
        server.close();
    }
});
