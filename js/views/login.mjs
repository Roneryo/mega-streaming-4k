import { User } from "../controllers/User.js"
let persona=new User();
if(persona.exists())
if(persona.isLogged()){
    window.location.href="/index.html"
}
let loginButton = document.querySelector("#Login");
loginButton.addEventListener("click",(e)=>{
    e.preventDefault();
    let user = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;
    let getUser = new User();
    let usuario = getUser.findOne(user);
    console.log(getUser);
    if(usuario){
        if(usuario.password==password){
            console.log("Usuario correcto")
            usuario.logged=true;
            getUser.update(usuario);
            window.location.href="/index.html";
        }
    }else{
        console.log("Usuario o contraseña invalido")
    }
})