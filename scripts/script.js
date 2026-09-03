import {
  renderBasketCount,
  getItemFromLocalStorage
} from "./helpers.js";


const purchasedProductsArray = getItemFromLocalStorage();
renderBasketCount(purchasedProductsArray);


//DONE: basket counter works  :)  
//NEXT: remove calculatetotalprice from shop, commit
//BLOCKED BY: what next?
