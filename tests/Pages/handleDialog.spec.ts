import { expect,Page } from "@playwright/test";

export default class DialogPage{
    constructor(public page: Page) {}


    async acceptAllCookies(){
        await this.page.locator('//div[@id="cookie-law-info-bar"]//./a[@id="wt-cli-accept-all-btn"]').click();
    }


}