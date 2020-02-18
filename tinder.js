const puppeteer = require('puppeteer');
const ChromeLauncher = require('chrome-launcher');

const {handleResponse} = require('./handleResponse');

ChromeLauncher.launch({
  startingUrl: 'https://google.com'
}).then(chrome => {
  let runScript = async () => {
    const browserURL = `http://127.0.0.1:${chrome.port}`;
    const browser = await puppeteer.connect({
      headless: false,
      slowMo: 200,
      browserURL
    });
    const context = await browser.defaultBrowserContext();
    const page = await context.newPage();

    await page.on('response', handleResponse);

    await page.goto('http://tinder.com/');


    // await page.waitForSelector('button[aria-label="Like"]');
    // while (true) {
    //   // await page.click('button[aria-label="Like"]');
    //   await sleep(5000);
    // }
  };

  runScript();
});