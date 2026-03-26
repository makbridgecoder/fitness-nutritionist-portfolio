const buttons = document.querySelectorAll(".shop_product_button");
const titles = document.querySelectorAll(".products__boxes-desc__title");
const basketCounter = document.getElementById("basket-product-number");

let purchasedProductsArray = [];
let totalPrice = 0;

function getTheText(e) {
   return e.innerText;
}

function textToNumber(e) {
  return parseFloat(e.replace(",", "."));
}

function getProductNumber(product) {
  return product.dataset.id;
}

function addTotalValue(e) {
  totalPrice += e;
}

function createProduct(id, name, price) {
  return {
    id: id,
    name: name,
    price: price
  };

}

function addProductToArray(product) {
   purchasedProductsArray.push(product);
   console.log(purchasedProductsArray);
   addItemToLocalStorage();
}





// create a local storage
const STORAGE_KEY = "basketProducts";

function addItemToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchasedProductsArray));
}


function getItemFromLocalStorage() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(stored);
  if(!stored) return;
  
  purchasedProductsArray = stored;
  console.log(purchasedProductsArray);
  renderBasketCount();
}

getItemFromLocalStorage();


console.log(purchasedProductsArray);


function basketIsEmpty() {
  return purchasedProductsArray.length === 0
}

if (basketIsEmpty()) {
  basketCounter.style.display = "none";
} 

function renderBasketCount() {
  basketCounter.style.display = "flex";
  basketCounter.innerText = purchasedProductsArray.length;
}

function showAlert(product, price, counter) {
  alert(`
    Dodałeś ${product} za ${price} do koszyka. 
    Łącznie w koszyku: ${counter} produktów 
    o wartości: ${totalPrice} PLN
    
    `);
  }
  
  
  
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".shop-product__main-box");
      if (!product) return;
      
      const id = product.dataset.id;
      
      const priceContainer = product.querySelector(".products__boxes-desc__price"); 
      const priceText = getTheText(priceContainer);
      const price = textToNumber(priceText);
      
      const title = product.querySelector(".products__boxes-desc__title").innerText; 
      
      const createdProduct = createProduct(id, title, price);
      console.log(createdProduct);

      addProductToArray(createdProduct);

      
      const productCounter = purchasedProductsArray.length;
      
      addTotalValue(price);
      
      showAlert(title, priceText, productCounter);
      renderBasketCount();
    });

});


