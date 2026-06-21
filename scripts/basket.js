//1. build a quantity button functionality
//1.1 i user add product twice, subtotal and quantity should change not appears a new product on ul list
//1.2 the same with deleting items - if product is
//4. zaaktualizuj koszyk button
//5. subtotal functionality
//6. użyj kodu -> alert
//7. przejdz do platności - how to solve this?
//8. declination of numbers in the alert
//9. make saparete addButtons and subtractionsButtons event handlers and that maka a commit, later transoform it in one even handler
//10. where should I use a arrow funcions within those code?

const productAmount = document.getElementById("basket-item-counter_number");
const basketProductList = document.querySelector(".basket-products"); //list container


let purchasedProductsArrayLength = purchasedProductsArray.length;

productAmount.textContent = purchasedProductsArrayLength;

console.log("Array at the beginning: ", purchasedProductsArray);

function getItemFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if(!stored) return;
  purchasedProductsArray = JSON.parse(stored);
}


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
    <h4 class="basket-product_title">${item.name}</h4>${item.id},${item.amount}
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
    <span>99PLN</span>
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

//and afer rendering:

const deleteButton = document.querySelectorAll(".basket-product_delete-cnt"); //all delete buttons

deleteButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    const item = e.target.closest(".basket-product-item"); 
    const buttonEl = item.querySelector(".basket-product_delete-cnt"); //why it doesn't work if i click on the button icon? only cnt work
    const id = item.dataset.id;
    //remove item from purchasedProductArray
    purchasedProductsArray = purchasedProductsArray.filter(item => item.id != id);
    
    addArraytoLocalStorage();
    cleanRenderedList(item);
    renderBasketCount();
    productAmount.textContent = purchasedProductsArray.length;
    
  });
  
})

// Quantity section
function findItemById(array, id) {
  const arrayItem = array.find(item => item.id === id);
  return arrayItem;
}

function getItemQuantity(item) {
  const itemAmount = item.amount;
  return itemAmount;
}

//increaseQuantity without updating purchasedProductsArray
function increaseQuantity(amount) {
  const quantity = amount + 1;
  return Number(quantity);
  
}

function decreaseQuantity(amount) {
  
  const amountNumber = Number(amount);
  if (amountNumber >= 2) {
    const quantity = amount - 1;
    return Number(quantity);
  }  else {
    return;
  }};
  
  //import { renderBasketCount } from "./shop.js";
  
/*function renderSubtotal(item ) {
  const element = item.
  }*/
  
function updateItemQuantityInArray(array, itemID, amount) {
  const itemIndex = array.findIndex(item => item.id === itemID);  // findIndex find only first element, i can't have two elements with the same id, only the quantity should change
  if (itemIndex == -1) {
    return;
  } 
  
  array[itemIndex].amount = amount;
  return itemIndex;
}

function findIndex(arr, itemId) {
  const index = arr.findIndex((item) => item.id === itemId); 
  return index;
}

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
    let amount = getItemQuantity(arrayItem); //this is amount taken from the purchasedProductArray
    amount = increaseQuantity(amount);
    const inputQuantity = item.querySelector(".item-quantity");
    
    inputQuantity.value = amount; 
    
    const index = updateItemQuantityInArray(purchasedProductsArray, itemID, amount);
    
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
    console.log(amount, price);
    if (amount >= 2) {
      amount = decreaseQuantity(amount);
      inputQuantity.value = amount;
      const index = updateItemQuantityInArray(purchasedProductsArray, itemID, amount);
      addArraytoLocalStorage();
      return;
    } else { 
      cleanRenderedList(item);
      removeItemFromArray(purchasedProductsArray, findIndex(purchasedProductsArray, itemID));
      renderBasketCount();
      //updateBasketCounter_number();

      addArraytoLocalStorage();
    }

  
});

});



