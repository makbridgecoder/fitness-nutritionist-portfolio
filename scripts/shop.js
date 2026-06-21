const buttons = document.querySelectorAll(".shop_product_button");
let basketCounter = document.getElementById("basket-product-number");

let purchasedProductsArray = [];

function getTheText(e) {
   return e.innerText;
}

function textToNumber(e) {
  return parseFloat(e.replace(",", "."));
}


function createProduct(id, name, price, img, amount) {
  return {
    id: id,
    name: name,
    price: price,
    img: img,
    amount: amount
  };

}

function addProductToArray(product) {
   purchasedProductsArray.push(product);
   addItemToLocalStorage();
}

// create a local storage
const STORAGE_KEY = "basketProducts";

function addItemToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchasedProductsArray));
}

function getItemFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  
  purchasedProductsArray = JSON.parse(stored);
  renderBasketCount();
  
}

getItemFromLocalStorage();

function calculateTotalPrice() {
 let total = 0;
  purchasedProductsArray.forEach(product => {
    const price = product.price;
    total += price;
  });

  return total.toFixed(2);
} 

function basketIsEmpty() {
  return purchasedProductsArray.length === 0;
}


function renderBasketCount() {
  if (basketIsEmpty()) {
    basketCounter.style.display = "none";
    return;
  } 

  basketCounter.style.display = "flex";
  basketCounter.innerText = purchasedProductsArray.length;
}



function showAlert(product, price, counter) {
  alert(`
    Dodałeś ${product} za ${price} do koszyka. 
    Łącznie w koszyku: ${counter} produktów 
    o wartości: ${calculateTotalPrice()} PLN
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

      //search for the img
      const img = product.querySelector(".product_img").getAttribute("src");
      
      let amount = 1;

      const createdProduct = createProduct(id, title, price, img, amount);
      addProductToArray(createdProduct);

      
      const productCounter = purchasedProductsArray.length;
      
      showAlert(title, priceText, productCounter);
      renderBasketCount();
      console.log(purchasedProductsArray)
    });

});


