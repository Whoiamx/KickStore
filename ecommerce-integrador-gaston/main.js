import {
  btnClothes,
  btnElectro,
  btnJoyery,
  crossBtn,
  getProducts,
} from "./js/product_page.js";
import { getElementsOffer } from "./js/ofert_page.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  getProducts();
  getElementsOffer();
});

d.addEventListener("click", (e) => {
  if (
    e.target === btnClothes ||
    e.target === btnElectro ||
    e.target === btnJoyery
  ) {
    crossBtn.style.setProperty("display", "block");
  }

  if (e.target === crossBtn) {
    crossBtn.style.setProperty("display", "none");
  }
});
