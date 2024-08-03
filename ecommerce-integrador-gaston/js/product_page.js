const d = document;
const products = d.getElementById("product-page");
const btnGaming = d.querySelector(".gaming");
const btnMobile = d.querySelector(".electro");
const btnAudio = d.querySelector(".audio");
const crossBtn = d.querySelector(".cross");
const cartButton = d.getElementById("cart");
const cartContainer = d.querySelector(".cart-container");
const counterCart = d.querySelector(".cart-length-number");

let productPage = []; // Devuelve los productos originales - no tocar

let productRender = []; // Variable que se va a utilizar para renderizar los productos

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Contiene los elementos/datos de productos que se agregan al carrito

let moneyToPay = []; // Array que contiene los precios de los productos agregados al carrito

let idElements = [];

// PETICION API PRODUCTOS
const getProducts = async () => {
  try {
    let res = await fetch("https://fakestoreapi.in/api/products?limit=16");
    let responseParser = await res.json();

    let productsResponse = await responseParser.products;

    return productsResponse;
  } catch (err) {
    products.innerHTML = `
    
    <div>
    <h1>Parece que algo fallo al buscar el stock de los productos 😅😅</h1>
    <br>
    <p>Error: ${err} llamar a Atencion al cliente: 0800-222-4444</p>
    </div>`;
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

const majorHandleButton = (id) => {
  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity++;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartUI();
};

const minorHandleButton = (id) => {
  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct.quantity > 1) {
    existingProduct.quantity--;
  } else {
    const carrito = cart.filter((e) => {
      return e.id !== id;
    });
    cart = carrito;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartUI();
  emptyCart();
};

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

  localStorage.setItem("moneyForPay", suma);
  return suma;
};

const updateCartUI = () => {
  cartContainer.classList.remove("cart-container");
  cartContainer.classList.add("block");
  cartContainer.innerHTML = "";
  moneyToPay = [];

  cart.forEach((el) => {
    cartContainer.innerHTML += `
      <div class="product">
        <div class="product-container">
          <img src="${el.img}" alt="">
          <h4 class="product-title">${el.title}</h4>
          <p> USD ${el.quantity * el.price}</p>
          <div class="price-content">
            <a data-id=${el.id} id="minor">-</a>
            <p>${el.quantity}</p>
            <p data-id=${el.id} id="major">+</p>
          </div>
        </div>
      </div>
      `;

    moneyToPay.push(el.price * el.quantity);
    idElements.push(el.id);
  });

  cartContainer.innerHTML += `
  <div class="total-price">
    <p>Total: USD ${calculatePrices()}  </p>
  </div>`;
  const majorButtons = document.querySelectorAll("#major");

  majorButtons.forEach((el) => {
    const id = el.getAttribute("data-id");

    el.addEventListener("click", (e) => {
      majorHandleButton(id);
    });
  });

  const minorButtons = document.querySelectorAll("#minor");

  minorButtons.forEach((el) => {
    const id = el.getAttribute("data-id");

    el.addEventListener("click", (e) => {
      minorHandleButton(id);
    });
  });
  quantityNumberCart();
};

// CART VACIO
const emptyCart = () => {
  let cartHTML = "";
  if (cart.length === 0) {
    return (cartContainer.innerHTML = `
      <div class="empty-cart">
      <div class="product-container-empty">
      <p> Aun no has agregado ningun producto al carrito 😅</p>
      </div>
      </div>
      </div>
      `);
  }
};

// Guardar en LS en el cart

const localStoreCart = () => {
  const localMoney = JSON.parse(localStorage.getItem("moneyForPay"));
  let cartHTML = "";
  if (cart.length) {
    cart.forEach((el) => {
      cartHTML += `
    <div class="product">
      <div class="product-container">
        <img src="${el.img}" alt="">
        <h4 class="product-title">${el.title}</h4>
        <p> USD ${el.quantity * el.price}</p>
        <div class="price-content">
          <p data-id=${el.id} id="minor">-</p>
          <p>${el.quantity}</p>
          <p data-id=${el.id} id="major">+</p>
        </div>
      </div>
    </div>
  `;
    });

    cartHTML += `
  <div class="total-price">
    <p>Total:  U$D  ${localMoney}  </p>
  </div>`;
    cartContainer.innerHTML = cartHTML;
  }
  const majorButtons = document.querySelectorAll("#major");

  majorButtons.forEach((el) => {
    const id = el.getAttribute("data-id");

    el.addEventListener("click", (e) => {
      majorHandleButton(id);
    });
  });

  const minorButtons = document.querySelectorAll("#minor");

  minorButtons.forEach((el) => {
    const id = el.getAttribute("data-id");

    el.addEventListener("click", (e) => {
      minorHandleButton(id);
    });
  });
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

// FUNCION QUE CUENTA CANTIDADES DE PRODUCTOS EN EL CARRITO

const quantityNumberCart = () => {
  const SumatoryCart = cart.map((el) => {
    return el.quantity;
  });

  let valorInicial = 0;

  const cartFullTotal = SumatoryCart.reduce(
    (acumulador, valorActual) => acumulador + valorActual,
    valorInicial
  );

  counterCart.textContent = cartFullTotal;
};

// VALIDACION DE FORMULARIO

const validateForm = () => {
  const form = d.getElementById("contact-center");
  const inputForm = d.querySelectorAll(".ec-contact-form [required]");

  inputForm.forEach((el) => {
    const spanMessage = d.createElement("span");
    spanMessage.id = el.name;
    spanMessage.textContent = el.title;
    spanMessage.classList.add("ec-contact-form-error", "none");
    el.insertAdjacentElement("afterend", spanMessage);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".ec-contact-form [required]")) {
      let inputTarget = e.target;

      let pattern = inputTarget.pattern || inputTarget.dataset.pattern;
      if (pattern && inputTarget.value !== "") {
        let regex = new RegExp(pattern);

        return !regex.exec(inputTarget.value)
          ? d.getElementById(inputTarget.name).classList.add("Isactive")
          : d.getElementById(inputTarget.name).classList.remove("Isactive");
      }

      if (!pattern) {
        return inputTarget.value === ""
          ? d.getElementById(inputTarget.name).classList.add("IsActive")
          : d.getElementById(inputTarget.name).classList.remove("IsActive");
      }
    }
  });
};

const functionInit = () => {
  filterActionSelection();
  addToCartProducts();
  emptyCart();
  localStoreCart();
};

functionInit();

export { getRenderProducts, addToCartProducts, validateForm };
