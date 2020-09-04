const StudyRoute = require('./StudyRoute');

class ELO {
    constructor(page, config) {
        this.states = {
            UNAUTHENTICATED: "UNAUTHENTICATED",
            AUTHENTICATED: "AUTHENTICATED",
        };
        this.state = "UNAUTHENTICATED";

        this.page = page;
        this.config = config;
    }

    async login() {
        await this.page.goto(this.config.eloUrl);
        await this.page.waitForSelector('#userNameInput', {
            visible: true,
            timeout: 0
        });
        await this.page.type('#userNameInput', this.config.username);
        await this.page.type('#passwordInput', this.config.password);
        await this.page.click('#submitButton');
        this.state = this.states.AUTHENTICATED;
    }

    async getTnsFrame(page) {
        await page.waitForSelector('#tns', {
            visible: true,
            timeout: 0
        });
        const tnsFrameHandle = await page.$('#tns');
        return await tnsFrameHandle.contentFrame();
    }

    async get202Frame(frame) {
        await frame.waitForSelector('#_202', {
            visible: true,
            timeout: 0
        });
        const _202FrameHandle = await frame.$('#_202');
        return await _202FrameHandle.contentFrame();
    }

    async getAllStudyRoutes() {
        const tnsFrame = await this.getTnsFrame(this.page);
        const _202Frame = await this.get202Frame(tnsFrame);

        await _202Frame.waitForSelector('#moreAll', {
            visible: true,
            timeout: 0
        });
        await _202Frame.click('#moreAll');

        await _202Frame.waitForSelector('#loadMoreSR_All', {
            visible: true,
            timeout: 0
        });
        await _202Frame.click('#loadMoreSR_All');

        const studyRouteThumbs = await _202Frame.$$('.all-studyroutes li');

        let studyRoutes = [];

        for(let i = 0; i < studyRouteThumbs.length; i++) {
            try {
                await _202Frame.waitForSelector(`.all-studyroutes li:nth-child(${i+1})`, {visible: true, timeout: 500})
                studyRoutes.push(new StudyRoute(studyRouteThumbs[i]));
            } catch(e) {}
        }

        return studyRoutes;
    }
}

module.exports = ELO;