const buttons = document.querySelectorAll(".shop_product_button");
const basketCounter = document.getElementById("basket-product-number");

const purchasedProductsArray = [];




function getProductNumber(product) {
  return product.dataset.id;
}


function addProductToArray(productNumber) {
   purchasedProductsArray.push(productNumber);
}

function basketIsEmpty() {
  return purchasedProductsArray.length === 0
}


function renderBasketCount() {
  basketCounter.innerText = purchasedProductsArray.length;
}


buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const product = e.target.closest(".shop-product__main-box");
    const id = product.dataset.id;

    addProductToArray(id);
    renderBasketCount();
  });
});

