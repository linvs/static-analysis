const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    args: [`--window-size=${1920},${1080}`]
  });
  for (let i = 0; i < 200; ++i) {
		const page = await browser.newPage();
    await page.goto("https://juejin.cn/post/6908523306211606542", {
      timeout: 2000,
      waitUntil: "domcontentloaded",
    });
		await page.waitForTimeout(2000);
		const viewsCount = await page.$eval('.views-count', el => el.innerText);
		console.log(viewsCount.slice(3));
    await autoScroll(page)
		await page.waitForTimeout(2000);
		await page.close();
  }
	await browser.close();
})();

async function autoScroll(page){
	await page.evaluate(async () => {
			await new Promise((resolve, reject) => {
					let totalHeight = 0;
					let distance = 100;
					let timer = setInterval(() => {
							window.scrollBy(0, distance);
							totalHeight += distance;

							if(totalHeight >= 5000){
									clearInterval(timer);
									resolve();
							}
					}, 100);
			});
	});
}