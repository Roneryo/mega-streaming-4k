import { User } from "../controllers/User.js"
console.log("registro");
let registrar = document.querySelector("#registrar");
registrar.addEventListener("click",(e)=>{
    e.preventDefault();
    let email=document.querySelector("#correo").value;
    let name=document.querySelector("#nombre").value;
    let lastName=document.querySelector("#apellido").value;
    let password=document.querySelector("#password").value;
    let birthdate=document.querySelector("#fechadenacimiento").value;
    let gender = document.querySelectorAll('[type="radio"]')
    gender = [...gender].find(element=>element.checked);
    gender=gender.value;
    let id=document.querySelector("#cedula").value;
    console.log(email,name,lastName,password,birthdate,gender,id)
    let persona = new User(email,name,lastName,password,birthdate,gender,id)
    persona.register()
    persona.login()
    window.location.href="/index.html"  
})
