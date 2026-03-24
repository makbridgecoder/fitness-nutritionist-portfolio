const buttons = document.querySelectorAll(".shop_product_button");
const titles = document.querySelectorAll(".products__boxes-desc__title");
const basketCounter = document.getElementById("basket-product-number");

const purchasedProductsArray = [];
let totalPrice = 0;

function getTheText(e) {
   return e.innerText;
}

/* first attempt

function convertTextToNumber(e) {
  const regexPattern = /(\d+),(\d+)\s*PLN/ ;
  const regexReplacement = "$1.$2";
  const string = e.replace(regexPattern, regexReplacement);
  return Number(string);
}
*/

function textToNumber(e) {
  return parseFloat(e.replace(",", "."));
}

function getProductNumber(product) {
  return product.dataset.id;
}

function addTotalValue(e) {
  totalPrice += e;
  
}

function addProductToArray(productNumber) {
  
  purchasedProductsArray.push(productNumber);
}

//check if basketIsEmpty() return correct value type
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
      console.log(price);
      
      const title = product.querySelector(".products__boxes-desc__title").innerText; 
      console.log(title);
      
      
      addProductToArray(id);
      const productCounter = purchasedProductsArray.length;

      addTotalValue(price);
      console.log(totalPrice);

      showAlert(title, priceText,productCounter);
      renderBasketCount();
      console.log(purchasedProductsArray);
  });

});


