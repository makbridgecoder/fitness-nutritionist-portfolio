
import {
  STORAGE_KEY,
  getItemFromLocalStorage,
  findIndex,
  findItemById,
  getItemQuantity,
  increaseQuantity,
  addSubtotalToObject,
  updateItemQuantityInArray,
  renderBasketCount, 
  calculateTotalPrice
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


function showAlert(product, price, counter) {
  alert(`
    Dodałeś ${product} za ${price} do koszyka. 
    Łącznie w koszyku: ${counter} rodzaje produktów 
    o wartości: ${calculateTotalPrice(purchasedProductsArray)} PLN
    `);
  }
  
  function showAlert2(product) {
    alert(`
      ${product} znajduje się już w koszyku!
      Ilość została zmieniona
      `);
  }

  function productIsInTheArray(arrayPar, idPar) {
    const item = arrayPar.find(item => item.id === idPar); 
    if (item) { 
      return true;
    }  else {
      return false;
    }
  }

  
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".shop-product__main-box");
      if (!product) return;
      
      const id = product.dataset.id;
      const title = product.querySelector(".products__boxes-desc__title").innerText; 

      if (productIsInTheArray(purchasedProductsArray, id)) {

        const arrayItem = findItemById(purchasedProductsArray, id); 
        let amount = getItemQuantity(arrayItem); 
        amount = increaseQuantity(amount);  
        const index = findIndex(purchasedProductsArray, id);
        updateItemQuantityInArray(purchasedProductsArray, index, amount); 

        
        const priceContainer = product.querySelector(".products__boxes-desc__price"); 
        const priceText = getTheText(priceContainer);
        const price = textToNumber(priceText);
        let subtotal = price * amount;
        addSubtotalToObject(purchasedProductsArray,index, subtotal);
        calculateTotalPrice(purchasedProductsArray);
        console.log(calculateTotalPrice(purchasedProductsArray));
        showAlert2(title);
        addItemToLocalStorage();
        return
      } 

        const priceContainer = product.querySelector(".products__boxes-desc__price"); 
        const priceText = getTheText(priceContainer);
        const price = textToNumber(priceText);
        
  
        //search for the img
        const img = product.querySelector(".product_img").getAttribute("src");
        
        let amount = 1;
        let subtotal = price;

        const createdProduct = createProduct(id, title, price, img, amount, subtotal); 
        addProductToArray(createdProduct);
        calculateTotalPrice(purchasedProductsArray);
        addItemToLocalStorage();
      const productCounter = purchasedProductsArray.length;
      
      showAlert(title, priceText, productCounter);
      renderBasketCount(purchasedProductsArray);
    });

});
