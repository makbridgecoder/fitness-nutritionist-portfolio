const body = document.querySelector("body");
const navbarCollapseContainer = document.getElementById("nav-collapse-cnt");
const hamburgerContainer = document.getElementById("navbar-hamburger-cnt");
const closeHamburgerContainer = document.getElementById("navbar-hamburger-close");
const hamburgerElement = document.getElementById("navbar-hamburger-el");

function activateToggleCollapseContainer() {
  navbarCollapseContainer.classList.toggle("visible");
  changeSymbolToClose();
  body.style.overflow = "hidden";
}

function collapseMenu() {
  navbarCollapseContainer.classList.remove("visible");
  changeSymbolToMenu();
  body.style.removeProperty('overflow');
}

function changeSymbolToClose() {
  hamburgerElement.innerText = "close";
}

function changeSymbolToMenu() {
  hamburgerElement.innerText = "menu";
}



hamburgerContainer.addEventListener("click", activateToggleCollapseContainer);
closeHamburgerContainer.addEventListener("click", collapseMenu);


console.log("test")
