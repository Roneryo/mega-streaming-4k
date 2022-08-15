import { header } from "../components/header.js";
import { carrousel } from "../components/carrousel.js";
import { BootstrapUtils } from "../utils/bootstrap.tooltip.mjs";
import { footer } from "../components/footer.js";
import { card } from "../components/card.js";
import { User } from "../controllers/User.js";
card();
header();
carrousel();
BootstrapUtils();
footer();

let user = new User().getCurrentUser();
let cards = document.querySelector(".carrito");
let format = Intl.NumberFormat("es-CO");
if (user.products.length > 0) {
  user.products.forEach((product) => {
    cards.innerHTML += `
      <div  class="col-4 my-3 mx-2 card" >
      <div class="card-body">
        <h5 class="card-title">${product.type}</h5>
        <p class="card-text">${product.name}</p>
        <p class="card-text">$${format.format(product.price)}</p>
        <a id="${product.uid}" class=" btn btn-danger" >Eliminar</a>
      </div>
    </div>`;
    console.log(product);
  });
} else {
  cards.innerHTML = "<h2 >No ha agregado productos a facturar!</h2>";
}

let eliminar = document.querySelectorAll(".btn.btn-danger");
eliminar.forEach((element) => {
  element.addEventListener("click", () => {
    let padre = element.parentElement.parentElement.parentElement;
    let contenedor = element.parentElement.parentElement;

    let user = new User().removeProduct(element.id);
    padre.removeChild(contenedor);
  });
});
