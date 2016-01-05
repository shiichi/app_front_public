"use strict";
export default class BingPageObject {
    constructor(url) {
        this.url = 'https://www.bing.com/';
    }

    async getPage() {
        await this.navigateTo(this.url);
    }

    async navigateTo(url) {
        await browser.get(url);
    }

    async getTitle() {
        let title = await browser.getTitle();
        return title;
    }

    async typeQuery(query) {
        let textbox = await $('#sb_form_q');
        return await textbox.sendKeys(query);
    }

    async search(query) {
        let submit = await $('#sb_form_go');
        await this.typeQuery(query);
        return submit.click();
    }

    async getQuery() {
        let textbox = await $('#sb_form_q');
        return await textbox.getAttribute('value');
    }

    async getAlgo() {
        let algo = await $$('#b_results > li').filter(async(elem) => {
           let cls = await elem.getAttribute('class');
           return cls === 'b_algo';
        });

        return await algo.map(async(elem) => {
            let title = await elem.$('h2').getText();
            return title;
        });
    }
}