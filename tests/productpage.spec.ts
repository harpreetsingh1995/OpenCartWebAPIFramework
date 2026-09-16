import {test,expect} from '../src/fixtures/pagefixtures';
import { ProductInfoPage } from '../src/pages/ProductInfoPage';


test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

test('comp logo exist on product page',async({basePage})=>{

expect(await basePage.isLogoVisible()).toBeTruthy();

});

test('footers exist on product page',async({basePage})=>{

expect(await basePage.getPageFooterCount()).toBe(16);

});

test('verify product images count', async ({homePage,searchResultsPage,productInfoPage})=>{
    await homePage.doSearch('macbook');
await searchResultsPage.searchProduct('MacBook Pro');
let imgCount= await productInfoPage.getProductImagesCount();
console.log('total images: ',imgCount);
expect(imgCount).toBe(4);


});

test('verify product information/data', async ({homePage,searchResultsPage,productInfoPage})=>{
    await homePage.doSearch('macbook');
await searchResultsPage.searchProduct('MacBook Pro');
let actualProductInfoMap= await productInfoPage.getProductInfo();
console.log('Action Product : Details', actualProductInfoMap);
  expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');

});
