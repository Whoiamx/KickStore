const d = document;
const products = d.getElementById("product-page");
const btnClothes = d.querySelector(".clothes");
const btnElectro = d.querySelector(".electro");
const btnJoyery = d.querySelector(".joyery");

const crossBtn = d.querySelector(".cross");

const getProducts = async () => {
  try {
    let res = await fetch("https://fakestoreapi.com/products?limit=12");
    let json = await res.json();

    const newArrayProduct = json.map((js) => {
      let objectProduct = {
        title: js.title,
        img: js.image,
        price: js.price,
        category: js.category,
      };
      return objectProduct;
    });

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
      const clothesFilter = newArrayProduct.filter((arr) => {
        return arr.category === "men's clothing";
      });

      const electroFilter = newArrayProduct.filter((arr) => {
        return arr.category === "electronics";
      });

      const joyeryFilter = newArrayProduct.filter((arr) => {
        return arr.category === "jewelery";
      });

      d.addEventListener("click", (e) => {
        if (e.target === btnClothes) {
          products.innerHTML = "";
          clothesFilter.forEach((clothes) => {
            products.innerHTML += `
           <div class="products">
           <div class="product-container">
            <img src="${clothes.img}" alt="">
            <h4 class="product-title">${clothes.title}</h4>
            <p>$ ${clothes.price}</p>
            <button id="btn-addCart">Agregar al carrito</button>
            </div>
            </div>`;
          });
          btnElectro.classList.remove("btn-orange");
          btnJoyery.classList.remove("btn-orange");
          btnClothes.classList.add("btn-orange");
        }

        if (e.target === btnElectro) {
          products.innerHTML = "";
          electroFilter.forEach((clothes) => {
            products.innerHTML += `
           <div class="products">
           <div class="product-container">
            <img src="${clothes.img}" alt="">
            <h4 class="product-title">${clothes.title}</h4>
            <p>$ ${clothes.price}</p>
            <button id="btn-addCart">Agregar al carrito</button>
            </div>
            </div>`;
          });
          btnElectro.classList.add("btn-orange");
          btnClothes.classList.remove("btn-orange");
          btnJoyery.classList.remove("btn-orange");
        }

        if (e.target === btnJoyery) {
          products.innerHTML = "";
          joyeryFilter.forEach((clothes) => {
            products.innerHTML += `
           <div class="products">
           <div class="product-container">
            <img src="${clothes.img}" alt="">
            <h4 class="product-title">${clothes.title}</h4>
            <p>$ ${clothes.price}</p>
            <button id="btn-addCart">Agregar al carrito</button>
            </div>
            </div>`;
          });
          btnJoyery.classList.add("btn-orange");
          btnClothes.classList.remove("btn-orange");
          btnElectro.classList.remove("btn-orange");
        }
      });
    };

    filterTotal();
  } catch {}
};

export { getProducts, crossBtn, btnClothes, btnElectro, btnJoyery, products };
