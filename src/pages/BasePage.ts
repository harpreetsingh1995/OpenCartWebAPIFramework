import { Locator } from "@playwright/test";

export class BasePage{

   protected readonly page: Page;


//common locators across all pages;

protected readonly logo: Locator;
protected readonly searchBox: Locator;
protected readonly searchIcon: Locator;
protected readonly footerLinks: Locator;
protected readonly currency: Locator;
protected readonly cartButton: Locator;


    constructor(page:Page){

        this.page=page;
        this.logo=page.getByAltText('naveenopencart');
        this.searchBox=page.getByPlaceholder('Search');
        this.searchIcon=page.locator('div#search button');
        this.currency=page.locator('#form-currency');
        this.footerLinks=page.locator('footer a');
        this.cartButton=page.locator('div#cart button');
    }


//common locators /functionalities/actions
async isLogoVisible(): Promise<boolean>{
    return this.logo.isVisible();

}

async isSearchBoxVisible(): Promise<boolean>{
    return this.searchBox.isVisible();

}

async getPageFooterCount(): Promise<number>{
    return this.footerLinks.count();

}

async getPageFooters(): Promise<string[]>{
    return this.footerLinks.allInnerTexts();

}

async isCurrencyBoxVisble(): Promise<boolean>{
    return this.currency.isVisible();

}

async isCartButtonVisble(): Promise<boolean>{
    return this.cartButton.isVisible();

}


//page level generic methods

async getPageTitle(): Promise<string>{
    return await this.page.title();

}

 getCurrentUrl(): string{
    return  this.page.waitForLoadState('load');

}
async takeScreenshot(name: string): Promise<string>{
    return await this.page.screenshot({
        fullPage:true,
        path: `reports/screenshot/${name}.png`
    });

}


}