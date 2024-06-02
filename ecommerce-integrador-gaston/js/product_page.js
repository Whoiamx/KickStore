const d = document;
const products = d.getElementById("product-page");
const btnGaming = d.querySelector(".gaming");
const btnMobile = d.querySelector(".electro");
const btnAudio = d.querySelector(".audio");

const crossBtn = d.querySelector(".cross");

const getProducts = async () => {
  let res = await fetch("https://fakestoreapi.in/api/products?limit=12");
  let responseParser = await res.json();

  let productsResponse = await responseParser.products;

  console.log(productsResponse);

  const newArrayProduct = productsResponse.map((product) => {
    let objectProduct = {
      title: product.title,
      img: product.image,
      price: product.price,
      category: product.category,
    };
    return objectProduct;
  });
  console.log(newArrayProduct);

  newArrayProduct.forEach((el) => {
    products.innerHTML += `
      <div class="product">
      <div class="product-container">
      <img src="${el.img}" alt="">
      <h4 class="product-title">${el.title}</h4>
      <p>$ ${el.price}</p>
      <button id="btn-addCart">Agregar al carrito</button>
      </div>
      </div>`;
  });

  const filterTotal = async () => {
    const gamingFilter = newArrayProduct.filter((arr) => {
      return arr.category === "gaming";
    });

    const mobileFilter = newArrayProduct.filter((arr) => {
      return arr.category === "mobile";
    });

    const audioFilter = newArrayProduct.filter((arr) => {
      return arr.category === "audio";
    });

    d.addEventListener("click", (e) => {
      if (e.target === btnGaming) {
        products.innerHTML = "";
        gamingFilter.forEach((games) => {
          products.innerHTML += `
           <div class="products">
           <div class="product-container">
            <img src="${games.img}" alt="">
            <h4 class="product-title">${games.title}</h4>
            <p>$ ${games.price}</p>
            <button id="btn-addCart">Agregar al carrito</button>
            </div>
            </div>`;
        });
        btnMobile.classList.remove("btn-orange");
        btnAudio.classList.remove("btn-orange");
        btnGaming.classList.add("btn-orange");
      }

      if (e.target === btnMobile) {
        products.innerHTML = "";
        mobileFilter.forEach((mobiles) => {
          products.innerHTML += `
           <div class="products">
           <div class="product-container">
            <img src="${mobiles.img}" alt="">
            <h4 class="product-title">${mobiles.title}</h4>
            <p>$ ${mobiles.price}</p>
            <button id="btn-addCart">Agregar al carrito</button>
            </div>
            </div>`;
        });
        btnMobile.classList.add("btn-orange");
        btnGaming.classList.remove("btn-orange");
        btnAudio.classList.remove("btn-orange");
      }

      if (e.target === btnAudio) {
        products.innerHTML = "";
        audioFilter.forEach((audi) => {
          products.innerHTML += `
           <div class="products">
           <div class="product-container">
            <img src="${audi.img}" alt="">
            <h4 class="product-title">${audi.title}</h4>
            <p>$ ${audi.price}</p>
            <button id="btn-addCart">Agregar al carrito</button>
            </div>
            </div>`;
        });
        btnAudio.classList.add("btn-orange");
        btnGaming.classList.remove("btn-orange");
        btnMobile.classList.remove("btn-orange");
      }
    });
  };

  filterTotal();
};

const addToCart = () => {};

export { getProducts, crossBtn, btnGaming, btnMobile, btnAudio, products };
