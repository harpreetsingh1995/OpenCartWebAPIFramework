import {test,expect} from '@playwright/test'
import { LoginPage } from '../src/pages/LoginPage'
import { HomePage } from '../src/pages/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage=new HomePage(page);
});


test('login page title test',async ({})=>{

const pageTitle=await loginPage.getLoginPageTitle();
console.log('loginpage title',pageTitle);
expect(pageTitle).toBe('Account Login')

});

test('forgot password link exist test',async ({})=>{
 
expect(await loginPage.isForgottenPwdLinkExit()).toBeTruthy();

});

test('user is able to login to app test',async ({})=>{
 
await loginPage.doLogin('PwBatch@open.com', 'pw123');
await expect.soft(homePage.isLogoutLinkExit()).toBeTruthy();
await expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});