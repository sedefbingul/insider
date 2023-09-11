import { expect,Page } from "@playwright/test";

export default class QualityAssurancePage{
    constructor(public page: Page) {}


    async verifyTheQualityAssurancePage(){
        const headingTextOfQAPage = await this.page.locator('//section[@id="page-head"]//./h1');
        await expect(headingTextOfQAPage).toBeVisible();
    }
    async clickSeeAllQAJobs(){
        await this.page.locator("//section[@id='page-head']//./a").click()
        await expect(this.page).toHaveURL("https://useinsider.com/careers/open-positions/?department=qualityassurance");
    }
    async searchByLocationAndDept(){
        await this.page.locator("//select[contains(@id,'filter-by-location')]").selectOption({label: "Istanbul, Turkey"});
        await this.page.locator("//select[@id='filter-by-department']").selectOption({label: "Quality Assurance"});
        await this.page.keyboard.press("Enter");
    }

    async checkResultOfSearch(){
        const listOfJobs = await this.page.locator('//div[contains(@class, "qualityassurance istanbul-turkey")]').count();
        console.log("listOfJobs:" + listOfJobs)
        await expect(listOfJobs).toBeGreaterThan(0);
    }

    async searchAllJobs(){
        await this.page.locator("//select[contains(@id,'filter-by-location')]").selectOption({value: "All"});
        await this.page.locator("//select[@id='filter-by-department']").selectOption({value: "All"});
        await this.page.keyboard.press("Enter");
    }

    async verifylistAllJob(){
        await this.page.locator("//select[contains(@id,'filter-by-location')]").selectOption({value: "All"});
        await this.page.keyboard.press("Enter");
        const AlllistOfJobs = await this.page.locator('//div[contains(@class, "position-list-item col-12 col-lg-4")]//span').allTextContents();
        console.log("AlllistOfJobs:"+ AlllistOfJobs);
    }

    async clickViewRoleButton({context}){
        const [newwindow] = await Promise.all([
            context.waitForEvent("page"),
            await this.page.locator("(//a[contains(@href, 'jobs.lever.co')])[1]").click()
        ])
        await expect(newwindow.url()).toContain("jobs.lever.co");
    }

    async checkIfThereIsQAJobInAllJobs(){
        const AlllistOfJobsRow = await this.page.locator('//div[contains(@class, "position-list-item col-12 col-lg-4")]//span');
        const countOfList = await this.page.locator('//div[contains(@class, "position-list-item col-12 col-lg-4")]//span').count();
        console.log(await AlllistOfJobsRow.allTextContents());
        console.log("countOfList:" + countOfList);
        sedef:for (let i= 0 ; i< 13; i++) 
        {
            console.log(await AlllistOfJobsRow.allTextContents());
            for (let i= 0 ; i< await AlllistOfJobsRow.count(); i++) 
            {
                
                if(await AlllistOfJobsRow.nth(i).textContent()== "Quality Assurance")
                {
                console.log("it is found");
                break sedef; 
                }   
            }
        
        await this.page.locator("(//button[contains(@class, 'next')])[2]").click();
        console.log("it is not found in this page");
        await this.page.waitForTimeout(1000);
        const ele = this.page.waitForSelector("(//div[contains(@class, 'position-list-item col-12 col-lg-4')])[12]");
        (await ele).waitForElementState("visible");
    }
    }


}