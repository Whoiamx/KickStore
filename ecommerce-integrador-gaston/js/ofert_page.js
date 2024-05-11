const d = document;

const containerOffer = d.querySelector(".ec-product-offer");

const getElementsOffer = async () => {
  try {
    let res = await fetch("https://fakestoreapi.com/products?limit=3");
    let json = await res.json();
    console.log(json);

    const arrayProductsOfer = json.map((js) => {
      let productLimit = {
        title: js.title,
        img: js.image,
        price: js.price,
      };
      return productLimit;
    });

    console.log(arrayProductsOfer);
    arrayProductsOfer.forEach((el) => {
      containerOffer.innerHTML += `<div class="product-offer">
      <img src="${el.img}" alt="">
        <p class="product-title">${el.title}</p>
        <p>$ ${el.price}</p>
        <button id="btn-addCart-Off">Agregar al carrito</button>
        
        </div>`;
    });
  } catch {}
};

export { getElementsOffer };
