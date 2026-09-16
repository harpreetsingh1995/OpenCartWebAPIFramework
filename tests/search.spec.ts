import {test,expect} from '../src/fixtures/pagefixtures';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

test('verify search with product', async ({homePage,searchResultsPage})=>{
    await homePage.doSearch('macbook');
expect(await searchResultsPage.getProductSearchResultCount()).toBe(3)

});

//Data Provider
const productData = CsvHelper.readCsv('src/data/product.csv');
for (const row of productData) {
    test.skip(`verify search results count - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage }) => {
        await homePage.doSearch(row.searchkey);
        expect(await searchResultPage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
    });

};

for (const row of productData) {
    test(`verify user is able to land on the product page - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, page }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultsPage.searchProduct(row.productname);
        expect(await page.title()).toBe(row.productname);
    });
};

test('comp logo exist on product page',async({basePage})=>{

expect(await basePage.isLogoVisible()).toBeTruthy();

});

test('footers exist on product page',async({basePage})=>{

expect(await basePage.getPageFooterCount()).toBe(16);

});