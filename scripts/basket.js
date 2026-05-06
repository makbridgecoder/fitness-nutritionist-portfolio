//2. fetch data from localstorage
//2.2 render data (products), how can I add new product in .basket-products?
//1. build a quantity button functionality
//3. delet button
//4. zaaktualizuj koszyk button
//5. subtotal functionality
//6. użyj kodu -> alert
//7. przejdz do platności - how to solve this?

const productAmount = document.getElementById("basket-item-counter_number");
const basketProductList = document.querySelector(".basket-products");


let purchasedProductsArrayLength = purchasedProductsArray.length;

productAmount.textContent = purchasedProductsArrayLength;

console.log(purchasedProductsArray);

//ok
function getItemIdFromArray (item) {
  return item.id;
}
console.log(getItemIdFromArray(purchasedProductsArray[1]));


function getItemImage (ids) {
  //find elemtent using ID

}

getItemImage()

function addImageToBasketItem (element) {
  console.log(id);


  

  

}

    
function renderBasketProducts(items) {
  items.forEach(item => {
  const li = document.createElement("li");

  li.innerHTML = `
    <div class="basket-product-item">
    <div class="basket-product-top">
      <div class="basket-product__img-cnt">
        <a href="/pages/shop.html/" class="basket-product__img-link">
          <img src="../images/shop_box_images.jpg" class="basket-cart__img" alt="Jeden z produktów dostępnych w sprzedaży">
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
        <input name="product-quantity" type="number" value="1" min="0" max="10" inputmode="numeric">
        <button class="addition_btn">+</button>
      </div>
      <div class="basket-product_subtotal-cnt">
        <span>Subtotal</span>
        <span>99PLN</span>
      </div>
      <div class="basket-product_delete-cnt">
        <div class="basket-product_delete-btn">
          <object data="../icons/trash.svg" type="image/svg+xml">Icon</object>
        </div>
      </div>
    </div>
  </div>
  
  `;

    basketProductList.appendChild(li);
});


}

renderBasketProducts(purchasedProductsArray);