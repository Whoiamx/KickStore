import {
  getRenderProducts,
  addToCartProducts,
  localStoreCart,
} from "./js/product_page.js";
import { getElementsOffer } from "./js/ofert_page.js";

const d = document;

d.addEventListener("DOMContentLoaded", async (e) => {
  getElementsOffer();
  getRenderProducts();
  localStoreCart();
});
