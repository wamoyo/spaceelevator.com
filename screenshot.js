const puppeteer = require('puppeteer');

async function takeScreenshots() {
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/brave-browser",
        headless: true,
        defaultViewport: { width: 1600, height: 1260 },
        args: [
            '--disable-web-security',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1600,1260'
        ]
    });

    const pages = [
        { name: 'home', url: 'http://localhost:8000/index.html' },
        { name: 'about', url: 'http://localhost:8000/about.html' },
        { name: 'technology', url: 'http://localhost:8000/technology.html' },
        { name: 'contact', url: 'http://localhost:8000/contact.html' }
    ];

    const viewports = [
        { name: 'desktop', width: 1600, height: 1260 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'mobile', width: 375, height: 812 }
    ];

    for (const pageInfo of pages) {
        const page = await browser.newPage();
        
        for (const viewport of viewports) {
            await page.setViewport({ width: viewport.width, height: viewport.height });
            await page.goto(pageInfo.url, { waitUntil: 'networkidle2' });
            
            // Wait a bit for any animations
            await page.waitForTimeout(1000);
            
            const filename = `screenshots/${pageInfo.name}-${viewport.name}.png`;
            await page.screenshot({ path: filename, fullPage: true });
            console.log(`Screenshot saved: ${filename}`);
        }
        
        await page.close();
    }

    await browser.close();
}

takeScreenshots().catch(console.error);