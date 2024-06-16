const d = document;
const products = d.getElementById("product-page");
const btnGaming = d.querySelector(".gaming");
const btnMobile = d.querySelector(".electro");
const btnAudio = d.querySelector(".audio");
const crossBtn = d.querySelector(".cross");
const cartButton = d.getElementById("cart");
const cartContainer = d.querySelector(".cart-container");
let buttons = d.getElementsByTagName("button");
console.log(buttons);

let productPage = []; // Devuelve los productos originales - no tocar

let productRender = []; // Variable que se va a utilizar para renderizar los productos

let cart = [];

let filter = "";

const categorias = [];

// PETICION API PRODUCTOS
const getProducts = async () => {
  let res = await fetch("https://fakestoreapi.in/api/products?limit=16");
  let responseParser = await res.json();

  let productsResponse = await responseParser.products;

  return productsResponse;
};

//NUEVO ARRAY DE PRODUCTOS CON LAS CATEGORIAS NECESARIAS
const getRenderProducts = async () => {
  const productToRender = await getProducts();

  const newArrayProduct = productToRender.map((product) => {
    let objectProduct = {
      id: product.id,
      title: product.title,
      img: product.image,
      price: product.price,
      category: product.category,
    };
    // if (!categorias.includes(product.category)) {
    //   categorias.push(product.category);
    // }

    return objectProduct;
  });

  productPage = newArrayProduct;
  productRender = newArrayProduct;

  renderCards(productRender);
  return newArrayProduct;
};

// FUNCION QUE RENDERIZA EL ARRAY DE PRODUCTOS QUE NECESITE
const renderCards = (productsArray) => {
  products.innerHTML = "";
  productsArray.forEach((el) => {
    products.innerHTML += `
          <div class="product">
          <div class="product-container">
          <img src="${el.img}" alt="">
          <h4 class="product-title">${el.title}</h4>
          <p> USD ${el.price}</p>
          <button class="addBtn" id="btn-addCart-Off" data-id="${el.id}" data-title="${el.title}" data-img="${el.img}" data-price="USD ${el.price}">Agregar al carrito</button>
          </div>
          </div>`;
  });
};

d.addEventListener("click", (e) => {
  if (e.target === btnGaming) {
    productRender = productPage.filter((arr) => {
      return arr.category === "gaming";
    });

    btnGaming.classList.add("btn-orange");
    btnMobile.classList.remove("btn-orange");
    btnAudio.classList.remove("btn-orange");
    renderCards(productRender);
  }

  if (e.target === btnAudio) {
    productRender = productPage.filter((arr) => {
      return arr.category === "audio";
    });
    btnGaming.classList.remove("btn-orange");
    btnMobile.classList.remove("btn-orange");
    btnAudio.classList.add("btn-orange");
    renderCards(productRender);
  }

  if (e.target === btnMobile) {
    productRender = productPage.filter((arr) => {
      return arr.category === "mobile";
    });
    btnGaming.classList.remove("btn-orange");
    btnMobile.classList.add("btn-orange");
    btnAudio.classList.remove("btn-orange");
    renderCards(productRender);
  }
});

const filterActionSelection = () => {
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

      renderCards(productPage);
    }
  });
};
filterActionSelection();

//FUNCION QUE AGREGA ELEMENTOS AL CARRITO

const addToCartProducts = () => {
  d.addEventListener("click", (e) => {
    let elementsToCart = e.target.dataset;

    cart.push(elementsToCart);

    e.preventDefault();
    if (cart.length) {
      cartContainer.classList.remove("cart-container");
      cartContainer.classList.add("block");

      cart.forEach((el) => {
        cartContainer.innerHTML += `
        <div class="product">
        <div class="product-container">
        <img src="${el.img}" alt="">
        <h4 class="product-title">${el.title}</h4>
        <p>  ${el.price}</p>
        <div class="price-content">
        <a id="minor">-</a>
        <p>1</p>
        <a id="major">+</a>
        </div>
        </div>
        
        </div>
        `;
      });

      checkVisibilityCart();
    }
  });
};

/**
 REVISAR DUPLICADOS Y COSAS UNDEFINED EN EL CARRITO
 */

//FUNCION QUE REVISA LA VISIBILIDAD DEL CARRITO

const checkVisibilityCart = () => {
  d.addEventListener("click", (e) => {
    if (e.target === cartButton) {
      if (cartContainer.classList.contains("cart-container")) {
        cartContainer.classList.remove("cart-container");
        cartContainer.classList.add("block");
      } else {
        cartContainer.classList.add("cart-container");
        cartContainer.classList.remove("block");
      }
    }
  });
};

export {
  getRenderProducts,
  addToCartProducts,
  crossBtn,
  btnGaming,
  btnMobile,
  btnAudio,
  products,
};
