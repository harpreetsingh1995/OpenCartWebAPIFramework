import{Locator,Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {

    //locators:
    //private Locators
   private readonly searchResults: Locator;



       constructor( page: Page ) {
        super(page);
        this.searchResults=page.locator('div.product-layout');
       

};

//public page actions(method)/behaviour

async getProductSearchResultCount():Promise<number>{
    return await this.searchResults.count();

}

async searchProduct(productName: string): Promise<void>{
    await this.page.getByRole('link',{name: productName,exact: true}).first().click();
}
} 