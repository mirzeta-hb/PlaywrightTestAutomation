import { test } from "@playwright/test";
import { AzureLoginPage } from "../page_objects/azure-login";

let azureLogin;

test.beforeEach(async ({page}) => {

    azureLogin = new AzureLoginPage(page);
});

test.describe('Work with Azure DevOps',()=> {

        test('Should login to Azure', async()=>{

           await  azureLogin.signInToAzureDevOps();


        });


});