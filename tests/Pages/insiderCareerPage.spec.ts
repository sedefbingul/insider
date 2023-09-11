
import { expect,Page } from "@playwright/test";

export default class InsiderPage{
    constructor(public page: Page) {}

    async gotoCareerPage(){
        await this.page.goto("https://useinsider.com/careers/")
    }


    //Action
    async verifyURL (){
        await expect(this.page).toHaveURL("https://useinsider.com/careers/");
    }

    async verifyLocationOfInsider (){
        const location = this.page.locator('//section[@id="career-our-location"]//./h3'); 
        await expect(location).toBeVisible();
    }
    async verifyTeamsOfInsider (){
        const teamsText = await this.page.locator('//section[@id="career-find-our-calling"]//./a[text()="See all teams"]'); 
        await expect(teamsText).toBeEnabled();
    }
    async verifyLifeAtInsider (){
        const lifeAtInsider = await this.page.locator('//h2[text()="Life at Insider"]'); 
        await expect(lifeAtInsider).toBeVisible();
    }

}