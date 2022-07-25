import { header } from '../components/header.js'
import { carrousel } from '../components/carrousel.js';
import { toast } from '../components/toast.js';
import { BootstrapUtils } from "../utils/bootstrap.tooltip.mjs";
import { footer } from "../components/footer.js"
header();
carrousel();
toast();
BootstrapUtils();
footer()
let nombre = document.querySelector("#txtnombre");
let correo = document.querySelector("#txtcorreo");
let telefono = document.querySelector("#txttelefono");

let enviar = document.querySelector("#btagregar");

enviar.addEventListener("click",()=>{
    alert(`${nombre.value} ${correo.value} ${telefono.value}`)
});
