
import {
  STORAGE_KEY,
  getItemFromLocalStorage,
  renderBasketCount,
  findIndex, 
  findItemById,
  addSubtotalToObject,
  getItemQuantity,
  increaseQuantity,
  updateItemQuantityInArray,
  calculateTotalPrice,
  renderTotalPrice, 
} from "./helpers.js";


const productAmount = document.getElementById("basket-item-counter_number");
const basketProductList = document.querySelector(".basket-products");
const finalPriceValue = document.getElementById("final-price-value");
let purchasedProductsArray = getItemFromLocalStorage();


function addArraytoLocalStorage() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(purchasedProductsArray)
  );
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
    <a href="/pages/shop.html" class="basket-product__img-link">
    <img src='${item.img}' class="product_img" alt="Produkt w sklepie">
    </a>
    </div>
    <div class="basket-product-content">
    <h4 class="basket-product_title">${item.name}</h4>
    <div class="basket-product_price">${item.price}PLN</div>
    </div>
    </div>
    <div class="basket-product-actions">
    <div class="basket-product_quantity-cnt">
    <button class="subtraction_btn">&#8722;</button>
    <input name="product-quantity" class="item-quantity" type="number" value="${item.amount}" min="1" max="10" inputmode="numeric" readonly>
    <button class="addition_btn">+</button>
    </div>
    <div class="basket-product_subtotal-cnt">
    <span class="subtotalTitle">Subtotal</span>
    <div>
    <span class="subtotal-price">${item.subtotal}</span><span> PLN</span> 
    
    </div>
    </div>
    <div class="basket-product_delete-cnt">
    <div class="basket-product_delete-btn">
    <img src="../icons/trash.svg" alt="">
    </div>
    </div>
    </div>
    </div>
    `;
    
    basketProductList.appendChild(li);
  });
}

renderBasketProducts(purchasedProductsArray);
updateBasketSummary();

const deleteButton = document.querySelectorAll(".basket-product_delete-cnt");

deleteButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    const item = e.target.closest(".basket-product-item"); 
    const id = item.dataset.id;
    purchasedProductsArray = purchasedProductsArray.filter(product => product.id !== id);
    
    addArraytoLocalStorage();
    cleanRenderedList(item);
    updateBasketSummary();
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
    const removed = arr.splice(itemIndex, 1);
    return removed;
    
  }
  
  const addButtons = document.querySelectorAll(".addition_btn");

addButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const item = e.target.closest(".basket-product-item");
    const itemID = item.dataset.id;
    const arrayItem = findItemById(purchasedProductsArray, itemID);
    let amount = getItemQuantity(arrayItem);
    amount = increaseQuantity(amount);
    
    const inputQuantity = item.querySelector(".item-quantity");
    
    inputQuantity.value = amount;     
    const index = findIndex(purchasedProductsArray, itemID); 
    const price = arrayItem.price;
    const itemSubtotal = item.querySelector(".subtotal-price");
    const subtotal = countSingleProductSubtotal(amount, price).toFixed(2);
    updateItemQuantityInArray(purchasedProductsArray, index, amount);
    addSubtotalToObject(purchasedProductsArray, index, subtotal);
    addArraytoLocalStorage();
    renderSubtotal(itemSubtotal, subtotal);
    updateBasketSummary();
  });
  
}

);

const subtractionButtons = document.querySelectorAll(".subtraction_btn"); 

subtractionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const item = e.target.closest(".basket-product-item"); 
    const itemSubtotal = item.querySelector(".subtotal-price");
    
    const itemID = item.dataset.id;
    const arrayItem = findItemById(purchasedProductsArray, itemID);
    let amount  = getItemQuantity(arrayItem); 
    const inputQuantity = item.querySelector(".item-quantity");
    const price = arrayItem.price;
    if (amount >= 2) {
      amount = decreaseQuantity(amount);
      inputQuantity.value = amount;
      
      const index = findIndex(purchasedProductsArray, itemID);
      const subtotal = countSingleProductSubtotal(amount, price).toFixed(2);
      updateItemQuantityInArray(purchasedProductsArray, index, amount);
      addSubtotalToObject(purchasedProductsArray, index, subtotal);
      addArraytoLocalStorage();
      renderSubtotal(itemSubtotal, subtotal);
      updateBasketSummary();
      return;
    } else { 
      cleanRenderedList(item);
      removeItemFromArray(purchasedProductsArray, findIndex(purchasedProductsArray, itemID));
      addArraytoLocalStorage();
      updateBasketSummary();

    }
    
  });
  
});

function countSingleProductSubtotal(quantity, price) {
  const subtotal = quantity * price;
  return subtotal; 
}

function renderSubtotal(item, value) {
  item.textContent = value;
}

function calculateFinalPrice (totalPrice) {
 
  return Number(totalPrice).toFixed(2); 
}

function renderFinalPrice(totalPrice) {
  finalPriceValue.innerText = calculateFinalPrice(totalPrice);
}

function updateBasketSummary() {
  renderBasketCount(purchasedProductsArray);
  productAmount.textContent = purchasedProductsArray.length;
  renderTotalPrice(purchasedProductsArray);
  renderFinalPrice(calculateTotalPrice(purchasedProductsArray));
}

