import test from "@playwright/test";
import { BitBucketLogin } from '../page_objects/bitbucket-login'

let bitBucketLogin;

test.beforeEach(async ({page}, testInfo) => {

    bitBucketLogin = new BitBucketLogin(page);
    testInfo.setTimeout(testInfo.timeout + 30000);
});

test.describe('Work with Bitbucket repo',()=> {

        test('Should create to BitBucket', async()=>{
           await  bitBucketLogin.goTo();
           await  bitBucketLogin.loginBitBucket('local');
           await  bitBucketLogin.openBitBucketRepo();
           await  bitBucketLogin.declinePullRequest();

        });


});