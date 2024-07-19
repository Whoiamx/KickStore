const d = document;
const products = d.getElementById("product-page");
const btnGaming = d.querySelector(".gaming");
const btnMobile = d.querySelector(".electro");
const btnAudio = d.querySelector(".audio");
const crossBtn = d.querySelector(".cross");
const cartButton = d.getElementById("cart");
const cartContainer = d.querySelector(".cart-container");
const counterCart = d.querySelector(".cart-length-number");
const main = d.getElementById("main");

let count = 0;

let productPage = []; // Devuelve los productos originales - no tocar

let productRender = []; // Variable que se va a utilizar para renderizar los productos

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Contiene los elementos/datos de productos que se agregan al carrito

let moneyToPay = JSON.parse(localStorage.getItem("moneyToPay")) || []; // Array que contiene los precios de los productos agregados al carrito

// PETICION API PRODUCTOS
const getProducts = async () => {
  try {
    let res = await fetch("https://fakestoreapi.in/api/products?limit=16");
    let responseParser = await res.json();

    let productsResponse = await responseParser.products;

    return productsResponse;
  } catch (err) {
    console.log(err);
  }
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
      <p> $ ${el.price}</p>
      <button id="${el.id}" class="addBtn"  data-id="${el.id}" data-title="${el.title}" data-img="${el.img}" data-price="${el.price}">Agregar al carrito</button>
      </div>
      </div>`;

    products.innerHTML += content;
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

//   //PENDIENTE REVISAR EL OVERLAY
//   main.innerHTML += `
//   <div class="overlay">
//   <p>Producto agregado con exito</p>
//   <div>`;

// const overlay = d.querySelector(".overlay");

const addToCartProducts = () => {
  d.addEventListener("click", (e) => {
    if (e.target.matches("[data-price]")) {
      e.preventDefault();

      const productId = e.target.dataset.id;
      const existingProduct = cart.find((item) => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        let newProduct = {
          id: e.target.dataset.id,
          img: e.target.dataset.img,
          title: e.target.dataset.title,
          price: parseInt(e.target.dataset.price),
          quantity: 1,
        };
        cart.push(newProduct);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      counterCart.textContent = cart.length;

      updateCartUI();
    }
  });
  quantityNumberCart();
};

const calculatePrices = () => {
  let suma = 0;

  moneyToPay.forEach((el) => {
    suma += el;
  });

  return suma;
};

const updateCartUI = () => {
  cartContainer.classList.remove("cart-container");
  cartContainer.classList.add("block");
  cartContainer.innerHTML = "";

  cart.forEach((el) => {
    cartContainer.innerHTML += `
      <div class="product">
        <div class="product-container">
          <img src="${el.img}" alt="">
          <h4 class="product-title">${el.title}</h4>
          <p> USD ${el.quantity * el.price}</p>
          <div class="price-content">
            <a id="minor">-</a>
            <p>${el.quantity}</p>
            <a id="major">+</a>
          </div>
        </div>
      </div>
      `;
    console.log(moneyToPay);
    moneyToPay.push(el.price);
  });
  cartContainer.innerHTML += `
  <div class="total-price">
    <p>Total: USD ${calculatePrices()}  </p>
  </div>`;

  localStorage.setItem("price", JSON.stringify(moneyToPay));
  quantityNumberCart();
};

const emptyCart = () => {
  if (cart.length === 0) {
    return (cartContainer.innerHTML += `
      <div class="empty-cart">
      <div class="product-container-empty">
      <p> Aun no has agregado ningun producto al carrito :(</p>
      </div>
      </div>
      </div>
      `);
  }
};

//FUNCION QUE GUARDA ELEMENTOS DEL CARRITO EN EL LOCALSTORAGE
const localStoreCart = () => {
  cart.forEach((el) => {
    cartContainer.innerHTML += `
      <div class="product">
        <div class="product-container">
          <img src="${el.img}" alt="">
          <h4 class="product-title">${el.title}</h4>
          <p> USD ${el.quantity * el.price}</p>
          <div class="price-content">
            <a id="minor">-</a>
            <p>${el.quantity}</p>
            <a id="major">+</a>
          </div>
        </div>
      </div>
    `;
  });
};

//FUNCION QUE GUARDA EN EL LOCAL STORAGE EL PRECIO A PAGAR

const totalLocalStorage = () => {
  cartContainer.innerHTML += `
  <div class="total-price">
    <p>Total: USD ${moneyToPay}  </p>
  </div>`;
};

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

const quantityNumberCart = () => {
  const SumatoryCart = cart.map((el) => {
    return el.quantity;
  });
  console.log(SumatoryCart);

  let valorInicial = 0;

  const cartFullTotal = SumatoryCart.reduce(
    (acumulador, valorActual) => acumulador + valorActual,
    valorInicial
  );

  counterCart.textContent = cartFullTotal;
};

const functionInit = () => {
  filterActionSelection();
  addToCartProducts();
  emptyCart();
  localStoreCart();
  totalLocalStorage();
};

functionInit();

export { getRenderProducts, addToCartProducts };
