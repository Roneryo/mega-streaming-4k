import { User } from "../controllers/User.js";
import { Products } from "../controllers/Productos.js";

import { header } from '../components/header.js';
import { carrousel } from '../components/carrousel.js';
import { footer } from '../components/footer.js';
import { toast } from '../components/toast.js';
import { BootstrapUtils } from "../utils/bootstrap.tooltip.mjs";
header();
carrousel();
toast();
BootstrapUtils();
footer();


let persona = new User();
let saludo = document.querySelector("#user");

let usuarioActual = persona.getAll();

if(!persona.exists()){
    window.location.href="/html/registro.html"
}
if(usuarioActual.length>=0)
usuarioActual=usuarioActual.find(usuario=>usuario.logged);
console.log(usuarioActual);

if(persona.isLogged()){

    saludo = saludo.innerHTML=`Bienvenido ${usuarioActual.name.toUpperCase()} ${usuarioActual.lastName.toUpperCase()}`
    new Products();
    let logOut = document.querySelector("#logOut");
    logOut.addEventListener("click",(e)=>{
        e.preventDefault();
        persona.logOut();
        window.location.href="/html/login.html"
    })

}else{
    window.location.href="/html/login.html"
}