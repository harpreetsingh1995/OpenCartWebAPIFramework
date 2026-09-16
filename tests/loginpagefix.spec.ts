import {test,expect} from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';




test.beforeEach(async ({ loginPage }) => {
    
    await loginPage.goToLoginPage();
    
});


test('login page title test',async ({loginPage})=>{

const pageTitle=await loginPage.getPageTitle();
console.log('loginpage title',pageTitle);
expect(pageTitle).toBe('Account Login')

});

test('forgot password link exist test',async ({loginPage})=>{
 
expect(await loginPage.isForgottenPwdLinkExit()).toBeTruthy();

});

test('user is able to login to app test',async ({loginPage,homePage})=>{
 
await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
await expect.soft(homePage.isLogoutLinkExit()).toBeTruthy();
await expect.soft(await homePage.getPageTitle()).toBe('My Account');
});

//DD_1 sequence mode-- 1 test is runing with test data cone by one
test('login to app using wrong crdentials with Data driven test',async({loginPage,testData})=>{
for(let row of testData){
    loginPage.doLogin(row.username,row.password);
    expect(await loginPage.isInavlidLogonErrorDisplayed()).toBeTruthy();

}

});

//DD_2 without fixtures, parallel mode, read csv data directly and loop the test method row wise..
let testData= CsvHelper.readCsv('src/data/loginData.csv');
for(let row  of testData){
     
    test(`invalid lofin test with =${row.username} - ${row.password}`, async({loginPage})=>{
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInavlidLogonErrorDisplayed()).toBeTruthy();
    });
};

let loginTestData= ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx','login');
for(let row  of loginTestData){
     
    test(`invalid login test with excel data =${row.username} - ${row.password}`, async({loginPage})=>{
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInavlidLogonErrorDisplayed()).toBeTruthy();
    });
};

let loginJSONData= JsonHelper.readJson('src/data/logindata.json');
for(let row  of loginJSONData){
     
    test(`invalid login test with JSON data - ${row.username} - ${row.password}`, async({loginPage})=>{
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInavlidLogonErrorDisplayed()).toBeTruthy();
    });
};