import {
  btnGaming,
  btnMobile,
  btnAudio,
  crossBtn,
  getProducts,
  products,
} from "./js/product_page.js";
import { getElementsOffer } from "./js/ofert_page.js";

const d = document;

d.addEventListener("DOMContentLoaded", async (e) => {
  getProducts();
  getElementsOffer();
});

d.addEventListener("click", async (e) => {
  if (
    e.target === btnGaming ||
    e.target === btnMobile ||
    e.target === btnAudio
  ) {
    crossBtn.style.setProperty("display", "block");
  }

  if (e.target === crossBtn) {
    crossBtn.style.setProperty("display", "none");
    btnAudio.classList.remove("btn-orange");
    btnGaming.classList.remove("btn-orange");
    btnMobile.classList.remove("btn-orange");
    products.innerHTML = getProducts();
  }
});
