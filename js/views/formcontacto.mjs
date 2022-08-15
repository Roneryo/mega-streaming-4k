import { header } from "../components/header.js";
import { carrousel } from "../components/carrousel.js";
import { toast } from "../components/toast.js";
import { BootstrapUtils } from "../utils/bootstrap.tooltip.mjs";
import { footer } from "../components/footer.js";
header();
carrousel();
toast();
BootstrapUtils();
footer();

let enviar = document.querySelector("#btagregar");

enviar.addEventListener("click", () => {
  let nombre = document.querySelector("#txtnombre").value;
  let apellido = document.querySelector("#txtapellido").value;
  let correo = document.querySelector("#txtcorreo").value;
  let telefono = document.querySelector("#txttelefono").value;
  let direccion = document.querySelector("#txtdireccion").value;
  let pais = document.querySelector("#txtpais").value;
  let mensaje = document.querySelector("#txtmensaje").value;

  if (
    nombre !== "" &&
    apellido !== "" &&
    correo !== "" &&
    telefono !== "" &&
    direccion !== "" &&
    pais !== "" &&
    mensaje !== ""
  ) {
    console.log({
      nombre,
      apellido,
      correo,
      telefono,
      direccion,
      pais,
      mensaje,
    });
    let tabla = document.querySelector("tbody");
    let nuevaFila = document.createElement("tr");
    let datos = [nombre, apellido, correo, telefono, direccion, pais, mensaje];
    datos.forEach((dato) => {
      let td = document.createElement("td");
      td.innerText = dato;
      nuevaFila.appendChild(td);
    });
    tabla.appendChild(nuevaFila);
  } else {
    console.log("Debe llenar todos los campos para enviar el mensaje");
  }
});
/*
document.querySelector("#txtnombre").value="Roner"
document.querySelector("#txtapellido").value="Ortega"
document.querySelector("#txtcorreo").value="roner.ortega@gmail.com"
document.querySelector("#txttelefono").value="3023318866"
document.querySelector("#txtdireccion").value="cl 57 sur #12341"
document.querySelector("#txtpais").value="COL"
document.querySelector("#txtmensaje").value="Un mensaje de prueba no tan largo pero que funciona para este caso"
*/
