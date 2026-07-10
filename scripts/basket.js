
//1. build a quantity button functionality
//1.1. subtotal functionality
//6. użyj kodu -> alert
//7. przejdz do platności - how to solve this?
//8. declination of numbers in the alert
//9. make saparete addButtons and subtractionsButtons event handlers and that maka a commit, later transoform it in one even handler
//10. where should I use a arrow funcions within those code?
//11. WHen i cliced a basket, first i saw a 0 than the corrent items number
//12. how to implement basket counter in the other subpage?
//13. create alert "you have already this product in your basket"
//13.1 and then display little window with two approaches: add or quit
//currentyly working on:
//productIsInTheArray() in shop.js, 
// verify addArraytoLocalStorage, in shop.js similar function has different name,
//c.d. move both to helpers.js
//

import {
  basketCounter,
  STORAGE_KEY
} from "./helpers.js";

import {
  getItemFromLocalStorage,
  calculateTotalPrice, // do i need this in basket.js?
  renderBasketCount,
  basketIsEmpty, 
  findIndex, 
  findItemById,
  getItemQuantity,
  increaseQuantity,
  updateItemQuantityInArray
} from "./helpers.js";



const productAmount = document.getElementById("basket-item-counter_number");
const basketProductList = document.querySelector(".basket-products"); //list container
let purchasedProductsArray = getItemFromLocalStorage();
 

let purchasedProductsArrayLength = purchasedProductsArray.length;

productAmount.textContent = purchasedProductsArrayLength;

console.log("Array at the beginning: ", purchasedProductsArray);


function addArraytoLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchasedProductsArray));
}

function cleanArray() {
  purchasedProductsArray = [];
}

function cleanRenderedList(element) {
  element.remove();
}

function renderBasketProducts(items) {
  items.forEach(item => {
    const li = document.createElement("li");
    
    li.innerHTML = `
    <div class="basket-product-item" data-id="${item.id}">
    <div class="basket-product-top">
    <div class="basket-product__img-cnt">
    <a href="/pages/shop.html/" class="basket-product__img-link">
    <img src='${item.img}' class="product_img" alt="Produkt w sklepie">
    </a>
    </div>
    <div class="basket-product-content">
    <h4 class="basket-product_title">${item.name}</h4>itemID:${item.id},amount:${item.amount}
    <div class="basket-product_price">${item.price}PLN</div>
    </div>
    </div>
    <div class="basket-product-actions">
    <div class="basket-product_quantity-cnt">
    <button class="subtraction_btn">&#8722;</button>
    <input name="product-quantity" class="item-quantity" type="number" value="${item.amount}" min="1" max="10" inputmode="numeric">
    <button class="addition_btn">+</button>
    </div>
    <div class="basket-product_subtotal-cnt">
    <span>Subtotal</span>
    <span id="subtotal-price">99PLN</span>
    </div>
    <div class="basket-product_delete-cnt">
    <div class="basket-product_delete-btn">
    <img src="../icons/trash.svg" type="image/svg+xml"></img>
    </div>
    </div>
    </div>
    </div>
    `;
    
    basketProductList.appendChild(li);
  });
}

renderBasketProducts(purchasedProductsArray);
renderBasketCount(purchasedProductsArray);

//and afer rendering:

const deleteButton = document.querySelectorAll(".basket-product_delete-cnt"); //all delete buttons

deleteButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    const item = e.target.closest(".basket-product-item"); 
    const buttonEl = item.querySelector(".basket-product_delete-cnt"); //why it doesn't work if i click on the button icon? only cnt work
    const id = item.dataset.id;
    //remove item from purchasedProductsArray
    purchasedProductsArray = purchasedProductsArray.filter(item => item.id != id);
    
    addArraytoLocalStorage();
    cleanRenderedList(item);
    renderBasketCount(purchasedProductsArray);
    productAmount.textContent = purchasedProductsArray.length;
    
  });
  
})

function decreaseQuantity(amount) {
  
  const amountNumber = Number(amount);
  if (amountNumber >= 2) {
    const quantity = amount - 1;
    return Number(quantity);
  }  else {
    return;
  }};
  
  
function removeItemFromArray(arr, itemIndex) { 
  const removed = arr.splice(itemIndex, 1); //remove one element with itemIndex from array
  return removed;
  
}

function calculateSubtotal(amount, price) {
 return amount * price; 
}
  
  //quantity section
const addButtons = document.querySelectorAll(".addition_btn");
  
addButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const item = e.target.closest(".basket-product-item");
    const itemID = item.dataset.id;
    const arrayItem = findItemById(purchasedProductsArray, itemID);
    let amount = getItemQuantity(arrayItem); //this is amount taken from the purchasedProductsArray
    amount = increaseQuantity(amount);

    const inputQuantity = item.querySelector(".item-quantity");
    
    inputQuantity.value = amount;     
    const index = findIndex(purchasedProductsArray, itemID); 

    updateItemQuantityInArray(purchasedProductsArray, index, amount);
    let newArray = updateItemQuantityInArray(purchasedProductsArray, index, amount);
    addArraytoLocalStorage();
    
    //renderSubtotal();
    
  });
  
}
  
);

const subtractionButtons = document.querySelectorAll(".subtraction_btn"); 

subtractionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const item = e.target.closest(".basket-product-item"); 
    const itemID = item.dataset.id;
    const arrayItem = findItemById(purchasedProductsArray, itemID);
    let amount  = getItemQuantity(arrayItem); 
    const inputQuantity = item.querySelector(".item-quantity");
    const price = arrayItem.price;
    if (amount >= 2) {
      amount = decreaseQuantity(amount);
      inputQuantity.value = amount;

      const index = findIndex(purchasedProductsArray, itemID);
      updateItemQuantityInArray(purchasedProductsArray, index, amount);
      addArraytoLocalStorage();
      return;
    } else { 
      cleanRenderedList(item);
      removeItemFromArray(purchasedProductsArray, findIndex(purchasedProductsArray, itemID));
      renderBasketCount(purchasedProductsArray);
      //updateBasketCounter_number();

      addArraytoLocalStorage();
      productAmount.textContent = purchasedProductsArray.length;
    }

  
});

});


