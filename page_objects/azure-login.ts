import { expect, Locator, Page } from "@playwright/test";
import * as dataJson from "../credintials.json";
 
export class AzureLoginPage{

   readonly  page: Page;
   readonly  signInButton: Locator;
   readonly  emailField: Locator;
   readonly  passwordField: Locator;
   readonly  yesButton: Locator;
   readonly  project: Locator;
   readonly nextButton: Locator;

   constructor(page: Page){

        this.page = page;
        this.signInButton = page.getByRole('link', { name: 'Sign in to Azure DevOps' });
        this.emailField = page.locator("//input[@type = 'email']");
        this.passwordField = page.getByPlaceholder('Password');
        this.yesButton = page.getByRole('button', { name: 'Yes' });
        this.project = page.getByRole('link', { name: 'AutomationTesy AutomationTesy' });
        this.nextButton = page.locator("//input[@type='submit']");

    }


    async signInToAzureDevOps(run: any, email: string, password: string){

        if (run == "local"){
            email = dataJson.email;
            password = dataJson.azurePassword;
       
        } else {
            email = email;
            password = password;

        }
       await this.page.goto("https://dev.azure.com/");
       await this.signInButton.click();
       await this.emailField.fill(email);
       await this.nextButton.click();
       await this.passwordField.fill(password);
       await this.nextButton.click();
       await this.yesButton.click();

       await expect(this.project).toBeVisible();

    }


}