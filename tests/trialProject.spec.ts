import { test, expect } from '@playwright/test';

    test('Open Home Page and Verify Title', async ({ page }) => {
        //Open URL
        await page.goto('https://useinsider.com/');
        await page.click('//div[@id="cookie-law-info-bar"]//./a[@id="wt-cli-accept-all-btn"]');

        //Verify Title
        await expect(page).toHaveTitle("#1 Leader in Individualized, Cross-Channel CX — Insider")

        const headingText = await page.locator('//h1');
        await expect(headingText).toBeVisible()
    })

    test('Select Company/Career Page and Verify Location, Life, Teams ', async ({ page }) => {
        //Open URL
        await page.goto("https://useinsider.com/");
        await page.waitForTimeout(1000);
        // Click the button
        await page.locator("(//a[@id='navbarDropdownMenuLink'])[4]").click();
        await page.waitForTimeout(1000);
        await page.locator("//a[text()='Careers']").click();

        //Verify URL h
        await expect(page).toHaveURL("https://useinsider.com/careers/");

        //Verify Location
        const location = page.locator('//section[@id="career-our-location"]//./h3'); 
        await expect(location).toBeVisible();

        //Verify Teams
        const teamsText = await page.locator('//section[@id="career-find-our-calling"]//./a[text()="See all teams"]'); 
        await expect(teamsText).toBeEnabled();

        //Verify Life at Insider
        const lifeAtInsider = await page.locator('//h2[text()="Life at Insider"]'); 
        await expect(lifeAtInsider).toBeVisible();
        
    })

    test('Open Quality Assurance Page and Verify Title', async ({ page }) => {
        //Open URL
        await page.goto('https://useinsider.com/careers/quality-assurance/');
        await page.click('//div[@id="cookie-law-info-bar"]//./a[@id="wt-cli-accept-all-btn"]');

        //Verify Title
        
        const headingTextOfQAPage = await page.locator('//section[@id="page-head"]//./h1');
        await expect(headingTextOfQAPage).toBeVisible();

        //Click See All QA Jobs button
        await page.locator("//section[@id='page-head']//./a").click()
        await expect(page).toHaveURL("https://useinsider.com/careers/open-positions/?department=qualityassurance");
        await page.locator("//select[contains(@id,'filter-by-location')]").selectOption({label: "Istanbul, Turkey"});
        await page.locator("//select[@id='filter-by-department']").selectOption({label: "Quality Assurance"});
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1000);

        //Verify the list of Jobs
        const listOfJobs = await page.locator('//div[contains(@class, "qualityassurance istanbul-turkey")]').count();
        console.log("listOfJobs:" + listOfJobs)
        await expect(listOfJobs).toBeGreaterThan(0);
    })

    test('Check Quality Assurance in All Jobs ', async ({ page }) => {
        //Open URL
        await page.goto('https://useinsider.com/careers/quality-assurance/');
        await page.click('//div[@id="cookie-law-info-bar"]//./a[@id="wt-cli-accept-all-btn"]');

        //Verify Title
        const headingTextOfQAPage = await page.locator('//section[@id="page-head"]//./h1');
        await expect(headingTextOfQAPage).toBeVisible();

        //Click See All QA Jobs button
        await page.locator("//section[@id='page-head']//./a").click()
        await expect(page).toHaveURL("https://useinsider.com/careers/open-positions/?department=qualityassurance");
        await page.waitForTimeout(3000);
        await page.locator("//select[@id='filter-by-department']").selectOption({value: "All"});
        await page.waitForTimeout(3000);
        await page.keyboard.press("Enter");
        await page.waitForSelector('//div[contains(@class, "position-list-item col-12 col-lg-4")]//span');

        //Verify the list of Jobs
        const tableItems = page.locator('//div[contains(@class, "position-list-item col-12 col-lg-4")]/./div');
        const AlllistOfJobsRow = await page.locator('//div[contains(@class, "position-list-item col-12 col-lg-4")]//span');
        const countOfList = await page.locator('//div[contains(@class, "position-list-item col-12 col-lg-4")]//span').count();
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
        await page.locator("(//button[contains(@class, 'next')])[2]").click();
        console.log("it is not found in this page");
        await page.waitForTimeout(3000);
        const ele = page.waitForSelector("(//div[contains(@class, 'position-list-item col-12 col-lg-4')])[12]");
        (await ele).waitForElementState("visible");
        }
    })
    test('Click View Role button and Check the URL', async ({ page , context}) => {
        //Open URL
        await page.goto('https://useinsider.com/careers/quality-assurance/');
        await page.click('//div[@id="cookie-law-info-bar"]//./a[@id="wt-cli-accept-all-btn"]');

        //Verify Title
        
        const headingTextOfQAPage = await page.locator('//section[@id="page-head"]//./h1');
        await expect(headingTextOfQAPage).toBeVisible();

        //Click See All QA Jobs button
        await page.locator("//section[@id='page-head']//./a").click()
        await expect(page).toHaveURL("https://useinsider.com/careers/open-positions/?department=qualityassurance");
        await page.locator("//select[contains(@id,'filter-by-location')]").selectOption({label: "Istanbul, Turkey"});
        await page.locator("//select[@id='filter-by-department']").selectOption({label: "Quality Assurance"});
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1000);

        //Click View Role button
        const [newwindow] = await Promise.all([
            context.waitForEvent("page"),
            await page.locator("(//a[contains(@href, 'jobs.lever.co')])[1]").click()
        ])
        
        await expect(newwindow.url()).toContain("jobs.lever.co");

 
    })

