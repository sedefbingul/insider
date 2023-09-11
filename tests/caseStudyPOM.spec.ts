import { test } from '@playwright/test';
import  InsiderPage  from './Pages/insiderHomePage.spec';
import DialogPage from './Pages/handleDialog.spec'
import  CareerPage  from './Pages/insiderCareerPage.spec';
import QualityAssurancePage from './Pages/qualityAssurancePage.spec';

test('Q1-Visit Home Page', async ({ page }) => {

    const homePage = new InsiderPage(page);
    const dialogPage = new DialogPage(page)
    await page.goto("https://useinsider.com/");
    await homePage.CheckTitleofHomePage();
    await page.waitForTimeout(3000);
    await dialogPage.acceptAllCookies();
    await homePage.CheckHeaderofHomePage();
 })

 test('Q2-Go to Career Page and Verify it', async ({ page }) => {

    const homePage = new InsiderPage(page);
    const dialogPage = new DialogPage(page)
    const careerPage = new CareerPage(page);
    await homePage.gotoHomePage();
    await homePage.CheckTitleofHomePage();
    await page.waitForTimeout(3000);
    await dialogPage.acceptAllCookies();
    await page.waitForTimeout(3000);
    await homePage.clickCompanyButton();
    await homePage.clickCareerButton();
    await page.waitForTimeout(3000);
    await careerPage.verifyURL();
    await careerPage.verifyLocationOfInsider();
    await careerPage.verifyTeamsOfInsider();
    await careerPage.verifyLifeAtInsider();
 })

 test('Q3-Go to Quality Assurance Page and Verify it', async ({ page }) => {

    const homePage = new InsiderPage(page);
    const dialogPage = new DialogPage(page)
    const qualityAssurancePage = new QualityAssurancePage(page);
    await page.goto("https://useinsider.com/careers/quality-assurance/");
    await dialogPage.acceptAllCookies();
    await page.waitForTimeout(1000);
    await qualityAssurancePage.verifyTheQualityAssurancePage();
    await page.waitForTimeout(500);
    await qualityAssurancePage.clickSeeAllQAJobs();
    await qualityAssurancePage.searchByLocationAndDept();
    await page.waitForTimeout(1000);
    await qualityAssurancePage.checkResultOfSearch();
})

test('Q4-Check QA job in all list of jobs', async ({ page }) => {
    const homePage = new InsiderPage(page);
    const dialogPage = new DialogPage(page)
    const qualityAssurancePage = new QualityAssurancePage(page);
    await page.goto("https://useinsider.com/careers/quality-assurance/");
    await dialogPage.acceptAllCookies();
    await page.waitForTimeout(1000);
    await qualityAssurancePage.verifyTheQualityAssurancePage();
    await qualityAssurancePage.clickSeeAllQAJobs();
    await page.waitForTimeout(1000);
    await qualityAssurancePage.searchAllJobs();
    await qualityAssurancePage.checkIfThereIsQAJobInAllJobs();
    //you can this test with debug mode.  running without debug mode, there is a bug. The bug ticket can be created. 

})

test('Q5-Click View Role button and verify it', async ({ page , context}) => {

    const homePage = new InsiderPage(page);
    const dialogPage = new DialogPage(page)
    const qualityAssurancePage = new QualityAssurancePage(page);
    await page.goto("https://useinsider.com/careers/quality-assurance/");
    await dialogPage.acceptAllCookies();
    await page.waitForTimeout(1000);
    await qualityAssurancePage.verifyTheQualityAssurancePage();
    await page.waitForTimeout(500);
    await qualityAssurancePage.clickSeeAllQAJobs();
    await qualityAssurancePage.searchByLocationAndDept();
    await page.waitForTimeout(1000);
    await qualityAssurancePage.checkResultOfSearch();
    await qualityAssurancePage.clickViewRoleButton({context});
    await page.waitForTimeout(1000);

})

