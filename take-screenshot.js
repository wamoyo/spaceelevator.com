#!/usr/bin/env node

// Simple screenshot script to be run with puppeteer command
(async () => {
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/brave-browser",
        headless: true,
        defaultViewport: { width: 1600, height: 900 },
        args: [
            '--disable-web-security',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();
    
    // Take desktop screenshot of homepage
    await page.setViewport({ width: 1600, height: 900 });
    await page.goto('http://localhost:8000/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'screenshots/home-desktop.png' });
    
    // Take mobile screenshot
    await page.setViewport({ width: 375, height: 812 });
    await page.screenshot({ path: 'screenshots/home-mobile.png' });
    
    await browser.close();
})();