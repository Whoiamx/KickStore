const d = document;
const products = d.getElementById("product-page");

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
  } catch {}
};

export { getProducts };
