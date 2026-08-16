import {
  body,
  hamburgerContainer,
  closeHamburgerContainer,
  navbarCollapseContainer,
  hamburgerElement, 
  activateToggleCollapseContainer,
  collapseMenu,
  changeSymbolToClose,
  changeSymbolToMenu
} from "./helpers.js";

hamburgerContainer.addEventListener("click", activateToggleCollapseContainer);
closeHamburgerContainer.addEventListener("click", collapseMenu);