
import {
  STORAGE_KEY,
  basketCounter, 
  getItemFromLocalStorage,
  findIndex,
  findItemById,
  getItemQuantity,
  increaseQuantity,
  updateItemQuantityInArray,
  basketIsEmpty, //use this for if to check if the item is in the basket
  renderBasketCount
} from "./helpers.js";


const buttons = document.querySelectorAll(".shop_product_button");
let purchasedProductsArray = getItemFromLocalStorage();

renderBasketCount(purchasedProductsArray);

function getTheText(e) {
  return e.innerText;
}

function textToNumber(e) {
  return parseFloat(e.replace(",", "."));
}


function createProduct(id, name, price, img, amount, subtotal) {
  return {
    id: id,
    name: name,
    price: price,
    img: img,
    amount: amount, 
    subtotal: subtotal
  };
  
}

function addProductToArray(product) {
  purchasedProductsArray.push(product);
}


function addItemToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchasedProductsArray));
}

//use for the alert - but it count incorrectly!!!! it count only price * 1 not by quantity
//so it works correctly only when all product's quntity is equal 1!!
function calculateTotalPrice() {
 let total = 0;
  purchasedProductsArray.forEach(product => {
    const price = product.price;
    total += price;
  });

  return total.toFixed(2);
} 



function showAlert(product, price, counter) {
  alert(`
    Dodałeś ${product} za ${price} do koszyka. 
    Łącznie w koszyku: ${counter} produktów 
    o wartości: ${calculateTotalPrice()} PLN
    `);
  }
  
  function showAlert2(product) {
    alert(`
      ${product} znajduje się już w koszyku!
      Ilość została zmieniona
      `);
  }

  function productIsInTheArray(arrayPar, idPar) {
    const item = arrayPar.find(item => item.id === idPar); // find only first item
    if (item) { 
      console.log("product is allready in the array");
      //i can use findIndex to return index; 
      return true;
    }  else {
      console.log("product is not in the array")
      return false;
    }
  }

  
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {

      
      const product = e.target.closest(".shop-product__main-box");
      if (!product) return;
      
      const id = product.dataset.id;

      console.log("before test: ", purchasedProductsArray)
      
      const title = product.querySelector(".products__boxes-desc__title").innerText; 

      if (productIsInTheArray(purchasedProductsArray, id)) {

        const arrayItem = findItemById(purchasedProductsArray, id); //find() method find only firs element
        let amount = getItemQuantity(arrayItem); //get item from the object
        amount = increaseQuantity(amount); // increase quantity by one 
        const index = findIndex(purchasedProductsArray, id);
        updateItemQuantityInArray(purchasedProductsArray, index, amount); //update quantity in the purchedProductsArray
        console.log("You have already this product in your basket")
        showAlert2(title);
        addItemToLocalStorage();

        //add to local storage
        
        return
      } 

        const priceContainer = product.querySelector(".products__boxes-desc__price"); 
        const priceText = getTheText(priceContainer);
        const price = textToNumber(priceText);
        
  
        //search for the img
        const img = product.querySelector(".product_img").getAttribute("src");
        
        let amount = 1;
        let subtotal = price;

        const createdProduct = createProduct(id, title, price, img, amount, subtotal); //check 
        addProductToArray(createdProduct);
        addItemToLocalStorage();
        
      

      
      const productCounter = purchasedProductsArray.length;
      
      showAlert(title, priceText, productCounter);
      renderBasketCount(purchasedProductsArray); // this function is already called earlier, is it doubled?
      console.log(purchasedProductsArray)
    });

});
