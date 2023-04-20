import { expect, Locator, Page } from "@playwright/test"

export class GetStartedPage {

    page: Page;
    readonly searchButton: Locator;
    readonly searchField: Locator;
    readonly parallelismAndShading: Locator;
    readonly displayedText: Locator;
    
    constructor(page){
        this.page = page;
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.searchField = page.getByPlaceholder('Search docs');
        this.parallelismAndShading = page.getByRole('option', { name: 'Parallelism and sharding' }).first();
        this.displayedText = page.getByText('Playwright Test runs tests in parallel. In order to achieve that, it runs severa');

    }

    async searchForParallelism(searchWord: string){
        await this.searchButton.click();
        await this.searchField.fill(searchWord);
        await this.parallelismAndShading.click();
        await expect(this.displayedText).toBeVisible();

    }


}