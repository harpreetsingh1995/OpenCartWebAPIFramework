import{Locator,Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    //locators:
    //private Locators
   private readonly logoutLink: Locator;
   private readonly headers: Locator;
  


       constructor( page: Page ) {
        super(page);
        this.logoutLink=page.getByRole('link',{name:'Logout'});
        this.headers=page.getByRole('heading', {level:2});


};

//public page actions(method)/behaviour




async isLogoutLinkExit():Promise<boolean>{

return await this.logoutLink.isVisible();

}

async getHomePageHeaders(): Promise<string[]>{
    return await this.headers.allInnerTexts();
}

 

async doSearch(searchkey: string){
    console.log(`serach key : ${searchkey}`);
    await this.searchBox.fill(searchkey);
    await this.searchIcon.click();
}

}