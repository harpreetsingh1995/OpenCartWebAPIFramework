import {test,expect} from '@playwright/test'
import { LoginPage } from '../src/pages/LoginPage'
import { HomePage } from '../src/pages/HomePage'


let loginPage:LoginPage;
let homepage: HomePage;

test.beforeEach(async ({page})=>{
    loginPage=new LoginPage(page);
  await  loginPage.goToLoginPage();
  await loginPage.doLogin('PwBatch@open.com', 'pw123');
  homepage=new HomePage(page);


});

test('home page title test', async()=>{

    const pageTitle=await homepage.getHomePageTitle();
    console.log('home page title', pageTitle);
    expect(pageTitle).toBe('My Account');

});

test('Logout link exist test', async()=>{

   expect(await homepage.isLogoutLinkExit()).toBeTruthy();

});

test ('homepage headers exist test',async()=>{
 let allheaders= await homepage.getHomePageHeaders();
 console.log('home page headers ', allheaders);
 expect.soft(allheaders).toHaveLength(4);
 expect.soft(allheaders).toEqual([
    'My Account',
    'My Orders',
    'My Affiliate Account',
    'Newsletter'

 ])

 
   
});