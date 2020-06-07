const puppeteer = require('puppeteer');

const config = require('../config.json');

(async () => {
    const browser = await puppeteer.launch({headless: config.headless});
    const page = await browser.newPage();
    await page.goto(config.eloUrl);

    await login(page);
    const studyRoutes = await getStudyRoutes(page);

    console.log(studyRoutes);

    await page.screenshot({path: 'example.png'});

    await browser.close();
})();

async function login(page) {
    await page.waitForSelector('#userNameInput', { visible: true, timeout: 0 });
    await page.type('#userNameInput', config.username);
    await page.type('#passwordInput', config.password);
    await page.click('#submitButton');
}

async function getStudyRoutes(page) {
    await page.waitForSelector('#tns', { visible: true, timeout: 0 });
    const tnsFrameHandle = await page.$('#tns');
    const tnsFrame = await tnsFrameHandle.contentFrame();

    await tnsFrame.waitForSelector('#_202', { visible: true, timeout: 0 });
    const _202FrameHandle = await tnsFrame.$('#_202');
    const _202Frame = await _202FrameHandle.contentFrame();

    await _202Frame.waitForSelector('#moreAll', { visible: true, timeout: 0 });
    await _202Frame.click('#moreAll');

    await _202Frame.waitForSelector('#loadMoreSR_All', { visible: true, timeout: 0 });
    await _202Frame.click('#loadMoreSR_All');

    return await _202Frame.$('.thumbs-list li a');
}