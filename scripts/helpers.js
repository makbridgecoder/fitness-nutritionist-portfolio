export const STORAGE_KEY = "basketProducts";
export let basketCounter = document.getElementById("basket-product-number");


export function getItemFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  return JSON.parse(stored);
}
  

export function calculateTotalPrice(array) {
 let total = 0;
  array.forEach(product => {
    const price = product.price;
    total += price;
  });

  return total.toFixed(2);
} 

export function basketIsEmpty(array) {
  return array.length === 0;
}


export function renderBasketCount(array) {
  if (basketIsEmpty(array)) {
    basketCounter.style.display = "none";
    return;
  } 
  const productsQuantity = array.length;
  basketCounter.style.display = "flex";
  basketCounter.innerText = productsQuantity;
}