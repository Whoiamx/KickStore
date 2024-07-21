const d = document;

const containerOffer = d.querySelector(".ec-product-offer");

const getElementsOffer = async () => {
  try {
    let res = await fetch("https://fakestoreapi.in/api/products?limit=3");

    let json = await res.json();
    let products = await json.products;

    const arrayProductsOfer = products.map((js) => {
      let productLimit = {
        id: js.id,
        title: js.title,
        img: js.image,
        price: js.price,
      };
      return productLimit;
    });

    arrayProductsOfer.forEach((el) => {
      containerOffer.innerHTML += `<div class="product-offer">
      <img src="${el.img}" alt="">
        <p class="product-title">${el.title}</p>
        <p>$ ${el.price}</p>
        <button class="addBtn" id="btn-addCart-Off" data-id="${el.id}" data-title="${el.title}" data-img="${el.img}" data-price="${el.price}">Agregar al carrito</button>
        
        </div>`;
    });
  } catch (err) {
    containerOffer.innerHTML = `
    
    <div>
    <p>Algo fallo al buscar el stock de los productos 😅😅</p>
    <br>
    <p>Error: ${err} llamar a Atencion al cliente: 0800-222-4444</p>
    </div>`;
  }
};

export { getElementsOffer };
