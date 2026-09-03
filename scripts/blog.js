import {
  renderBasketCount, 
  getItemFromLocalStorage
} from "./helpers.js";

const purchasedProductsArray = getItemFromLocalStorage();
renderBasketCount(purchasedProductsArray);