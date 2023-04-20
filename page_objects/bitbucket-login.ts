import { expect, Locator, Page } from "@playwright/test";
import * as dataJson from "../credintials.json";
import { PROption } from "./pr-options";


export class BitBucketLogin{

    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly enterButton: Locator;
    readonly bitBucketIcon: Locator;
    readonly profileButton: Locator;
    readonly allWorkspacesButton: Locator;
    readonly automationWorkspace: Locator;
    readonly automationRepo: Locator;
    readonly selectRepo: Locator;
    readonly selectNewBranch: Locator;
    readonly projectDirectory: Locator;
    readonly hamburgerMenu: Locator;
    readonly addFileButton: Locator;
    readonly fileNameField: Locator;
    readonly textArea: Locator;
    readonly commitButton: Locator;
    readonly createPullRequest: Locator;
    readonly finalCommitButton: Locator;
    readonly pullRequestsButton: Locator;
    readonly pullRequestLink: Locator;
    readonly moreButton: Locator;
    readonly decline: Locator;
    readonly declinedPRText: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailField = page.getByPlaceholder('Enter email');
        this.passwordField = page.getByPlaceholder('Enter password');
        this.bitBucketIcon = page.locator('.sc-hSdWYo > button').first();
        this.profileButton = page.getByTestId('profile-button');
        this.allWorkspacesButton = page.getByRole('link', { name: 'All workspaces' });
        this.automationWorkspace = page.getByRole('link', { name: 'Automation Codescene' });
        this.automationRepo = page.getByRole('link', { name: 'automation-test' });
        this.selectRepo = page.getByTestId('ref-selector-trigger');
        this.selectNewBranch = page.getByRole('link', { name: 'new_branch' });
        this.projectDirectory = page.getByRole('link', { name: 'Directory, playwright' });
        this.hamburgerMenu = page.getByTestId('repo-actions-menu--trigger');
        this.addFileButton = page.getByRole('menuitem', { name: 'Add file' });
        this.fileNameField = page.getByPlaceholder('filename');
        this.commitButton = page.getByRole('button', { name: 'Commit' });
        this.createPullRequest = page.getByText('Create a pull request for this change');
        this.textArea = page.locator('textarea').nth(1);
        this.finalCommitButton = page.locator('#commit-form').getByText('Commit').nth(4);
        this.pullRequestsButton = page.getByTestId('ContextualNavigation').getByRole('link', { name: 'Pull requests' });
        this.pullRequestLink = page.getByRole('link', { name: 'created online with Bitbucket' });
        this.moreButton = page.getByRole('button', { name: 'More' });
        this.decline = page.getByRole('button', { name: 'Decline' });
        this.declinedPRText= page.locator('section').filter({ hasText: 'Declined pull request'});
    }

    async goTo(){
      await  this.page.goto('https://id.atlassian.com/login?application=bitbucket');
    }

    async loginBitBucket(run: string, email:any, password: any){
        if (run == "local"){
            email = dataJson.email;
            password = dataJson.password;
       
        } else {
            email = email;
            password = password;

        }
        await this.emailField.fill(email);
        await this.emailField.press('Enter');
        await this.passwordField.fill(password);
        await this.passwordField.press('Enter');

        await expect(this.bitBucketIcon).toBeVisible();

    }

    async openBitBucketRepo(){

        await this.bitBucketIcon.click();
        await this.profileButton.dblclick({timeout: 8000});
        await this.allWorkspacesButton.click();
        await this.automationWorkspace.click();
        await this.automationRepo.click();
        await this.selectRepo.click();
        await this.selectNewBranch.click();
        await this.selectRepo.click();
        await this.projectDirectory.click();
        await this.hamburgerMenu.click();
        await this.addFileButton.click();
        await this.fileNameField.fill('Automation file');
        await this.textArea.fill('File added', {timeout: 3000});
        await this.commitButton.click();
        await this.createPullRequest.click();
        await this.page.waitForTimeout(2000);
        await this.finalCommitButton.click();
      
        await this.page.waitForSelector("//div[text()= 'Pull requests']", {timeout: 3000});
        await this.pullRequestsButton.click();
        await this.page.waitForSelector("//tr[@data-qa = 'pull-request-row']");

        await expect(this.pullRequestLink).toBeVisible();


    }

    async declinePullRequest(){
        await this.pullRequestLink.click();
        await this.moreButton.click();
        await this.page.getByText(PROption.Decline).click();
        await this.decline.click()

        await expect(this.declinedPRText).toBeVisible();
    }

}