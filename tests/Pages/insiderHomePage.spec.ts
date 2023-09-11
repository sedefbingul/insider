import { expect,Page } from "@playwright/test";

export default class InsiderPage{
    constructor(public page: Page) {}


    async gotoHomePage(){
        await this.page.goto("https://useinsider.com/")
    }


    //Action
    async clickCompanyButton (){
        await this.page.locator("(//a[@id='navbarDropdownMenuLink'])[4]").click();
    }

    async clickCareerButton (){
        await this.page.locator("//a[text()='Careers']").click();
    }

    async CheckTitleofHomePage (){
        await expect(this.page).toHaveTitle("#1 Leader in Individualized, Cross-Channel CX — Insider")
    }

    async CheckHeaderofHomePage (){
        const headingText = await this.page.locator('//h1');
        await expect(headingText).toBeVisible()
    }

}