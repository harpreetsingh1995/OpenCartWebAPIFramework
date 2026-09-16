import{Locator,Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    //locators:
    //private Locators
   private readonly headers: Locator;
    private readonly productImage: Locator;
     private readonly productMetaData: Locator;
      private readonly productPricing: Locator;
      private map: Map<string, string|number>;
      



       constructor( page: Page ) {
        super(page);
        this.headers=page.getByRole('heading',{name:'MacBook Pro', level:1});
        this.productImage=page.locator('div#content li img');
        
      this.productMetaData=page.locator("div#content ul.list-unstyled:nth-of-type(1) li");
      this.productPricing=page.locator("div#content ul.list-unstyled:nth-of-type(2) li");
this.map=new Map<string,string|number>;

};

//public page actions(method)/behaviour

async getProductHeader():Promise<string>{
    return await this.headers.innerText();

}

async getProductImagesCount():Promise<number>{
    await this.productImage.first().waitFor({state:'visible'});
    return await this.productImage.count();
    
}

async getProductInfo():Promise<Map<string,string|number>>{
    this.map.set('ProductHeader', await this.getProductHeader());
    this.map.set('ProductImages', await this.getProductImagesCount());
    await  this.getProductMetaData();
    await this.getProductPricingData();
    return this.map;

}

 private async getProductMetaData(){
    
let metaData=await this.productMetaData.allInnerTexts();
for(let data of metaData){
    let meta= data.split(":");
    let metaKey=meta[0].trim();
    let metaValue=meta[1].trim();
    this.map.set(metaKey,metaValue);

}

}

private async getProductPricingData():Promise<void>{
    let priceData =await this.productPricing.allInnerTexts();
    let productPrice= priceData[0].trim();
    let exTaxPrice= priceData[1].split(":")[1].trim();
    this.map.set('ProductPrice',productPrice);
    this.map.set('ExTaxPrice',exTaxPrice);
    

}


}