import {
  btnClothes,
  btnElectro,
  btnJoyery,
  crossBtn,
  getProducts,
  products,
} from "./js/product_page.js";
import { getElementsOffer } from "./js/ofert_page.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  getProducts();
  getElementsOffer();
});

d.addEventListener("click", async (e) => {
  if (
    e.target === btnClothes ||
    e.target === btnElectro ||
    e.target === btnJoyery
  ) {
    crossBtn.style.setProperty("display", "block");
  }

  if (e.target === crossBtn) {
    crossBtn.style.setProperty("display", "none");
    btnJoyery.classList.remove("btn-orange");
    btnClothes.classList.remove("btn-orange");
    btnElectro.classList.remove("btn-orange");
    products.innerHTML = getProducts();
  }
});
