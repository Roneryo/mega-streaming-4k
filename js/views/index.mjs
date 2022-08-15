import { User } from "../controllers/User.js";
import { Products } from "../controllers/Productos.js";

import { header } from "../components/header.js";
import { carrousel } from "../components/carrousel.js";
import { footer } from "../components/footer.js";
import { toast } from "../components/toast.js";
import { BootstrapUtils } from "../utils/bootstrap.tooltip.mjs";
header();
carrousel();
toast();
BootstrapUtils();
footer();

let persona = new User();
let saludo = document.querySelector("#user");
let carrito = document.querySelector('[data-bs-toggle="tooltip"]');

let usuarioActual = persona.getAll();

if (!persona.exists()) {
  window.location.href = "/html/registro.html";
}
if (usuarioActual.length >= 0)
  usuarioActual = usuarioActual.find((usuario) => usuario.logged);
console.log(usuarioActual);

if (persona.isLogged()) {
  saludo =
    saludo.innerHTML = `Bienvenido ${usuarioActual.name.toUpperCase()} ${usuarioActual.lastName.toUpperCase()}`;
  if (usuarioActual.products) {
    let Carrito = document.querySelector('[data-bs-toggle="tooltip"]');
    Carrito.attributes[4].value = `¡Tienes ${usuarioActual.products.length} Productos actualmente!`;
    setTimeout(() => {
      $('[data-bs-toggle="tooltip"]').tooltip("dispose");
      $('[data-bs-toggle="tooltip"]').tooltip("enable");
    }, null);
  }

  new Products();
  let logOut = document.querySelector("#logOut");
  logOut.addEventListener("click", (e) => {
    e.preventDefault();
    persona.logOut();
    window.location.href = "/html/login.html";
  });
} else {
  window.location.href = "/html/login.html";
}
