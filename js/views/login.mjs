import { User } from "../controllers/User.js";
import { toast } from "../components/toast.js";
toast();
let persona = new User();
if (persona.exists())
  if (persona.isLogged()) {
    window.location.href = "/index.html";
  }
let loginButton = document.querySelector("#Login");
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  let user = document.querySelector("#usuario").value;
  let password = document.querySelector("#password").value;
  let getUser = new User();
  getUser.login(user, password);
});
