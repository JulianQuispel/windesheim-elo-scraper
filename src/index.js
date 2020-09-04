const puppeteer = require('puppeteer');
const ELO = require('./ELO');

const config = require('../config.json');

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: config.headless,

        });
        const page = await browser.newPage();

        // Create a new ELO instance
        const elo = new ELO(page, config);

        await elo.login();

        const studyRoutes = await elo.getAllStudyRoutes();

        studyRoutes.map(async studyRoute => {
            const name = await studyRoute.getName();
            console.log(name);
        });

        // await browser.close();
    } catch (e) {
        console.log(`Error! ${e}`);
    }
})();

async function getTreeFrame(frame) {
    const _204FrameHandle = await frame.waitForSelector('#_204', {
        visible: true,
        timeout: 0
    });
    const _204Frame = await _204FrameHandle.contentFrame();

    console.log("204");

    const widgetsFrameHandle = await _204Frame.waitForSelector('#widgetsiframe', {
        visible: true,
        timeout: 0
    });
    const widgetsFrame = await widgetsFrameHandle.contentFrame();

    console.log("Widgets");

    const treeFrameHandle = await widgetsFrame.waitForSelector('#WidgetPage_WidgetZonePanel1 .widget_body iframe', {
        visible: true,
        timeout: 0
    });

    return await treeFrameHandle.contentFrame();
}

async function getAllStudyRoutesFrame(page) {
    const tnsFrame = await getTnsFrame(page);
    return await get202Frame(tnsFrame);
}

async function navigateToStudyRoutes(page) {
    let frame = await getAllStudyRoutesFrame(page);
    const studyRoutesCount = await frame.$$eval(
        '.all-studyroutes li',
        studyRoutes => studyRoutes.length
    );


    for (let i = 0; i < studyRoutesCount; i++) {
        frame = await getAllStudyRoutesFrame(page);

        let studyRoute = await frame.waitForSelector(`.all-studyroutes li:nth-child(${i+1})`, {
                visible: true,
                timeout: 2000
            })
            .catch(() => {
                console.log("Item not clickable");
            });

        if (studyRoute) {
            await studyRoute.click();

            await getAllDirectories(page);

            await page.goBack();
        }
    }
}

async function getAllDirectories(page) {
    const tnsFrame = await getTnsFrame(page);
    const treeFrame = await getTreeFrame(tnsFrame);

    await treeFrame.waitForSelector('.nscTreeView ul li', {
        visible: true,
        timeout: 0
    });
    const directories = await treeFrame.$$('.nscTreeView ul li');

    console.log(directories.length);


    for (let directory of directories) {
        let name = await (await directory.getProperty('textContent')).jsonValue();
        console.log(name);

    }
}