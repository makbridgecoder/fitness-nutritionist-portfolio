//1. build a quantity button functionality
//1.1 i user add product twice, subtotal and quantity should change not appears a new product on ul list
//1.2 the same with deleting items - if product is
//3. delet button
//4. zaaktualizuj koszyk button
//5. subtotal functionality
//6. użyj kodu -> alert
//7. przejdz do platności - how to solve this?
//8. declination of numbers
//9. 

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

// how can I target to id - key of the object not to array id
function removeItemFromArray(arr, idProperty) { 
  const newArray = arr.filter(item => item.id.value !== Number(idProperty));
  console.log(newArray);
  return newArray;
}



/*
function deleteItemFromLocalStorage(id) {
  getItemFromLocalStorage();
  // delete one item
  removeItemFromArray(purchasedProductsArray, id);
  
  }
*/

// Save the updated array back to LS
addArraytoLocalStorage();

function cleanArray() {
  purchasedProductsArray = [];
}


function cleanRenderedList(element) {
  element.remove();
}

/*
//it can't work - we target to object and in event handler target to div
function returnId(object) {
  console.log(object.id.value);
  return item.id.value;
}
*/

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
    <h4 class="basket-product_title">${item.name}</h4>${item.id}
    <div class="basket-product_price">${item.price}PLN</div>
    </div>
    </div>
    <div class="basket-product-actions">
    <div class="basket-product_quantity-cnt">
    <button class="subtraction_btn">&#8722;</button>
    <input name="product-quantity" type="number" value="1" min="0" max="10" inputmode="numeric">
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
    
    //Now i need to solve it out how to delete one item from an array, Ls, and render list without deleted elements
    
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


