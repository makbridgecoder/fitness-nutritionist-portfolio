import {
  renderBasketCount,
  getItemFromLocalStorage
} from "./helpers.js";


const purchasedProductsArray = getItemFromLocalStorage();
console.log(purchasedProductsArray);
renderBasketCount(purchasedProductsArray);


//DONE: 
//NEXT: work on renderBasketCount() on each page
//BLOCKED BY: should I duplicate code to each page or use helpers.js?
//...renderBasketCount() work but only to the first element navbar-collapse, how can i make it work also to secend el. ?