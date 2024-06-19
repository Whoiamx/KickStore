const d = document;
const products = d.getElementById("product-page");
const btnGaming = d.querySelector(".gaming");
const btnMobile = d.querySelector(".electro");
const btnAudio = d.querySelector(".audio");
const crossBtn = d.querySelector(".cross");
const cartButton = d.getElementById("cart");
const cartContainer = d.querySelector(".cart-container");
const addBtnCart = d.querySelectorAll("#addBtn");
// console.log(addBtnCart);

let productPage = []; // Devuelve los productos originales - no tocar

let productRender = []; // Variable que se va a utilizar para renderizar los productos

let cart = []; // Contiene los elementos/datos de productos que se agregan al carrito

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
    const content = `
      <div class="product">
      <div class="product-container">
      <img src="${el.img}" alt="">
      <h4 class="product-title">${el.title}</h4>
      <p> USD ${el.price}</p>
      <button id="${el.id}" class="addBtn" id="btn-addCart-Off" data-id="${el.id}" data-title="${el.title}" data-img="${el.img}" data-price="USD ${el.price}">Agregar al carrito</button>
      </div>
      </div>`;

    products.innerHTML += content;

    const btnAddCart = d.getElementById(`${el.id}`);

    console.log(btnAddCart);

    btnAddCart.addEventListener("click", addToCart);
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

//FUNCION QUE AGREGA ELEMENTOS AL CARRITO

const addToCart = (e) => {
  console.log(cart);
  let flag = false;

  cart.forEach((el) => {
    if (e.target.dataset.id == el.id) {
      flag = true;

      el.quantity += 1;

      return;
    }
  });
  if (flag) {
    return;
  }

  let elementsToCart = {
    id: e.target.dataset.id,
    img: e.target.dataset.img,
    title: e.target.dataset.title,
    price: e.target.dataset.price,
    quantity: 1,
  };

  cart.push(elementsToCart);
};

// const addToCartProducts = () => {
//   d.addEventListener("click", (e) => {
//     let elementsToCart = {
//       id: e.target.dataset.id,
//       img: e.target.dataset.img,
//       title: e.target.dataset.title,
//       price: e.target.dataset.price,
//     };

//     console.log(addBtnCart);
//     cart.push(elementsToCart);

//     if (cart.length && e.target.matches("[data-price]")) {
//       e.preventDefault();
//       cartContainer.classList.remove("cart-container");
//       cartContainer.classList.add("block");

//       cartContainer.innerHTML = "";

//       cart.forEach((el) => {
//         console.log(cart);
//         cartContainer.innerHTML += `
//         <div class="product">
//         <div class="product-container">
//         <img src="${el.img}" alt="">
//         <h4 class="product-title">${el.title}</h4>
//         <p>  ${el.price}</p>
//         <div class="price-content">
//         <a id="minor">-</a>
//         <p>1</p>
//         <a id="major">+</a>
//         </div>
//         </div>
//         </div>

//         `;
//       });

//       cartContainer.innerHTML += `<div>
//       <p>Total:  </p>

//       </div>`;
//       checkVisibilityCart();
//     }
//   });
// };

//FUNCION QUE REVISA LA VISIBILIDAD DEL CARRITO

cartButton.addEventListener("click", (e) => {
  if (cartContainer.classList.contains("cart-container")) {
    cartContainer.classList.remove("cart-container");
    cartContainer.classList.add("block");
  } else {
    cartContainer.classList.add("cart-container");
    cartContainer.classList.remove("block");
  }
});

// const checkVisibilityCart = () => {
//   d.addEventListener("click", (e) => {
//     if (e.target === cartButton) {
//       if (cartContainer.classList.contains("cart-container")) {
//         cartContainer.classList.remove("cart-container");
//         cartContainer.classList.add("block");
//       } else {
//         cartContainer.classList.add("cart-container");
//         cartContainer.classList.remove("block");
//       }
//     }
//   });
// };

filterActionSelection();
export { getRenderProducts }; //addToCartProducts };
