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
let agregar = document.querySelector("#btagregar");
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

    let user = new User();
    user.removeProduct(element.id);
    padre.removeChild(contenedor);
    user = user.getCurrentUser();
    if (user.products.length == 0) {
      cards.innerHTML = "<h2 >No ha agregado productos a facturar!</h2>";
    }
  });
});

agregar.addEventListener("click", () => {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  user.products.forEach((product) => {
    let tr = document.createElement("tr");
    for (let data in product) {
      let td = document.createElement("td");
      td.innerText = product[data];
      if (data === "price") td.innerText = `$${format.format(product[data])}`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
  let total = 0;
  user = new User().getCurrentUser();
  let precios = user.products.map((product) => parseInt(product.price));
  precios.forEach((precio) => {
    total += precio;
  });
  console.log(total);
  let tr = document.createElement("tr");
  let product = user.products[0];
  for (let data in product) {
    let td = document.createElement("td");
    let p = document.createElement("p");
    p.classList.add("fw-bold");
    console.log(data);
    if (data === "uid") {
      p.innerText = "Total";
    }
    if (data === "price") {
      p.innerText = `$${format.format(total)}`;
    }
    td.appendChild(p);
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
});

function htmlToCSV(html, filename) {
  var data = [];
  var rows = document.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++) {
      row.push(cols[j].innerText);
    }

    data.push(row.join(","));
  }

  downloadCSVFile(data.join("\n"), filename);
}
function downloadCSVFile(csv, filename) {
  var csv_file, download_link;

  csv_file = new Blob([csv], { type: "text/csv" });

  download_link = document.createElement("a");

  download_link.download = filename;

  download_link.href = window.URL.createObjectURL(csv_file);

  download_link.style.display = "none";

  document.body.appendChild(download_link);

  download_link.click();
}
document.getElementById("exportar").addEventListener("click", function () {
  var html = document.querySelector("table").outerHTML;
  htmlToCSV(html, "precio.csv");
});
