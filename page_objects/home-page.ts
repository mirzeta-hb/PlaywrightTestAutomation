import { expect, Locator, Page } from "@playwright/test";

export class HomePage{
    readonly page: Page;
    readonly getStartedButton: Locator;
    readonly howToInstallPlaywright: Locator;
    readonly installPlaywrightCommand: Locator;

    constructor(page: Page){
        this.page = page;
        this.getStartedButton = page.getByRole('link', { name: 'Get started' });
        this.howToInstallPlaywright = page.getByRole('link', { name: 'How to install Playwright' });
        this.installPlaywrightCommand = page.getByText('init playwright@latest');

    }

    async goTo(){
        await this.page.goto("https://playwright.dev/");
    }

    async navigateToInstallPlaywrightCommand(){
        await this.getStartedButton.click();
        await this.howToInstallPlaywright.click();
        await expect(this.installPlaywrightCommand).toBeVisible();

    }


}