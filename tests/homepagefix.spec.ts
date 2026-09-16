import {test,expect} from '../src/fixtures/pagefixtures';



test.beforeEach(async ({loginPage})=>{
    
  await  loginPage.goToLoginPage();
  await loginPage.doLogin('PwBatch@open.com', 'pw123');



});

test('home page title test', async({homePage})=>{

    const pageTitle=await homePage.getPageTitle();
    console.log('home page title', pageTitle);
    expect(pageTitle).toBe('My Account');

});

test('Logout link exist test', async({homePage})=>{

   expect(await homePage.isLogoutLinkExit()).toBeTruthy();

});

test ('homepage headers exist test',async({homePage})=>{
 let allheaders= await homePage.getHomePageHeaders();
 console.log('home page headers ', allheaders);
 expect.soft(allheaders).toHaveLength(4);
 expect.soft(allheaders).toEqual([
    'My Account',
    'My Orders',
    'My Affiliate Account',
    'Newsletter'

 ])

 
   
});

test('comp logo exist on product page',async({basePage})=>{

expect(await basePage.isLogoVisible()).toBeTruthy();

});

test('footers exist on product page',async({basePage})=>{

expect(await basePage.getPageFooterCount()).toBe(16);

});