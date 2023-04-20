import { test } from '@playwright/test';
import { HomePage } from '../page_objects/home-page';
import { GetStartedPage } from '../page_objects/get-started-page';

let homePage;
let getStartedPage;

test.beforeEach(async ({page}) =>
{
    homePage = new HomePage(page);
    getStartedPage = new GetStartedPage(page);

})


test.describe("Navigate to different sections in Playwright doc", () => 
{

    test('Should be navigated to installation page', async() => {
      
           await homePage.goTo();
           await homePage.navigateToInstallPlaywrightCommand();

    });

    test('Should be navigated to Parallelism and shading', async () => {

        await homePage.goTo();
        await homePage.navigateToInstallPlaywrightCommand();    
        await getStartedPage.searchForParallelism("Parallelism");

    }); 




});
