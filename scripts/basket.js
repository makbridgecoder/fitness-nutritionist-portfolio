//1. build a quantity button functionality
//1.1 i user add product twice, subtotal and quantity should change not appears a new product on ul list
//1.2 the same with deleting items - if product is
//4. zaaktualizuj koszyk button
//5. subtotal functionality
//6. użyj kodu -> alert
//7. przejdz do platności - how to solve this?
//8. declination of numbers in the alert
//9. 

const productAmount = document.getElementById("basket-item-counter_number");
const basketProductList = document.querySelector(".basket-products"); //list container
const additionButtons = document.querySelectorAll(".addition_btn"); 
const subtractionButtons = document.querySelectorAll(".subtraction_btn"); 


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

function removeItemFromArray(arr, idProperty) { 
  const newArray = arr.filter(item => item.id.value !== Number(idProperty));
  console.log(newArray);
  return newArray;
}

addArraytoLocalStorage(); //Is this necessery here?

function cleanArray() {
  purchasedProductsArray = [];
}


function cleanRenderedList(element) {
  element.remove();
}


console.log("Before rendering: ", purchasedProductsArray);

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
    <input name="product-quantity" class="item-quantity" type="number" value="1" min="0" max="10" inputmode="numeric">
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
    console.log(item);
    
    const buttonEl = item.querySelector(".basket-product_delete-cnt"); //why it doesn't work if i click on the button icon? only cnt work
    
    const id = item.dataset.id;
    console.log("id: ",id); // i have the product ID!!!
    
    
    //remove item from purchasedProductArray
    console.log("Before remove from the array", purchasedProductsArray);
    purchasedProductsArray = purchasedProductsArray.filter(item => item.id != id);
    console.log("after remove from the array", purchasedProductsArray);
    
    addArraytoLocalStorage();
    console.log("after adding to LS", purchasedProductsArray);

    
    cleanRenderedList(item);
    
    renderBasketCount();
    productAmount.textContent = purchasedProductsArray.length;
    
  });
  
})


// Quantity section
// 1. How can I save current quantity? -LS?
//function returns an object from purchedProductsArray
function findItemById(array, id) {
  const arrayItem = array.find(item => item.id === id);
  console.log(arrayItem);
  return arrayItem;
}

function getItemQuantity(item) {
  const itemAmount = item.amount;
  console.log("itemAmount", itemAmount);
  return itemAmount;
}

//increaseQuantity without updating purchasedProductsArray
function increaseQuantity(item, amount) {
  const itemAmount = item.amount
  const newQuantity = amount + 1;
  console.log("New quantity:", newQuantity);
  return newQuantity;
}

function renderItemQuantity(varible, amount) {

}

/*function renderSubtotal(item ) {
  const element = item.
}*/

function updateItemQuantityInArray(array, itemID, amount) {
  const itemIndex = array.findIndex(item => item.id === itemID);// findIndex find only first element, i can't have two elements with the same id, only the quantity should change
  console.log("index:", itemIndex);
  array[itemIndex].amount = amount;
  return itemIndex;


}



//quantity section
const addButton = document.querySelectorAll(".addition_btn");

addButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    const item = e.target.closest(".basket-product-item");

    const itemID = item.dataset.id;
    console.log("itemID", itemID);

    //Find item in purchedProductsArray based on itemID, do I need this?
    const arraysItem = findItemById(purchasedProductsArray, itemID);
    let amount = getItemQuantity(arraysItem); //this is amount taken from the purchasedProductArray
    
    //increase quantity by one 
    amount = increaseQuantity(itemID, amount);
    console.log("quantity:", amount); //ok

    //render -> add to array -> set in LS
    renderItemQuantity(amount); 
    console.log(purchasedProductsArray);
    
    const inputQuantity = item.querySelector(".item-quantity");
    
    console.log("quantity before assign: ", inputQuantity.value);
    inputQuantity.value = amount; 
    
    const index = updateItemQuantityInArray(purchasedProductsArray, itemID, amount);

    console.log("amount in the array after input change", purchasedProductsArray[index].amount);
    

    //renderSubtotal();
    

    // add to purchasedArray
    // change only value on the webpage, do not render again?
    // maybe add to LS(but how to do this? --> add property to object?)


    
  })

}

)
