import { miStorage } from "./Storage.js";
export class User extends miStorage {
  constructor(email, name, lastName, password, birthdate, gender, id) {
    super(User.name);
    this.name = name;
    this.lastName = lastName;
    this.password = password;
    this.id = id;
    this.birthdate = birthdate ?? "";
    this.gender = gender ?? "";
    this.email = email;
    this.logged = false;
    this.products = 0;
  }
  getFullName() {
    return `${this.name} ${this.second_name} ${this.lastName} ${this.second_lastName}`;
  }
  register() {
    let registerData = {
      name: this.name,
      lastName: this.lastName,
      // second_name:this.second_name,
      // second_lastName:this.second_lastName,
      password: this.password ?? "",
      birthdate: this.birthdate ?? "",
      email: this.email ?? "",
      gender: this.gender ?? "",
      id: this.id,
      logged: false,
    };
    if (this.create(registerData)) {
      // console.log("Se ha registrado el usuario con exito");
    } else {
      // console.log(`la cedula ${this.id} ya se encuentra registrada`);
    }
  }
  login(user, password) {
    user = this.findOne(user);
    const toastLiveExample = document.getElementById("liveToast");
    const toast = new bootstrap.Toast(toastLiveExample);
    let mensaje = document.querySelector(".toast-body");
    if (user) {
      if (user.password === password) {
        console.log("Usuario correcto");
        user.logged = true;
        this.update(user);
        mensaje.innerText = `¡Autenticacion exitosa!`;
        toast.show();

        window.location.href = "/index.html";
      } else {
        mensaje.innerText = `Usuario o contraseña invalido.`;
        mensaje.show();
      }
    } else {
      mensaje.innerText = `Usuario o contraseña invalido.`;
      toast.show();
    }
  }
  logOut() {
    let userLoged = this.getAll();
    if (userLoged) userLoged = userLoged.filter((user) => user.logged);
    userLoged[0].logged = false;
    console.log(userLoged);
    this.update(userLoged[0]);
  }
  isLogged() {
    let userLoged = this.getAll();
    if (userLoged) userLoged = userLoged.filter((user) => user.logged);
    console.log(userLoged);
    return userLoged.length > 0;
  }
  getCurrentUser() {
    let userLoged = this.getAll();
    userLoged = userLoged.filter((user) => user.logged)[0];
    return userLoged;
  }
  addProduct(name, type, price) {
    let user = this.getCurrentUser();
    if (user.products) {
      console.log("Tengo productos");
      let uid = Math.random().toString(16).slice(2);
      user.products.push({ uid, name, type, price });
      let Carrito = document.querySelector('[data-bs-toggle="tooltip"]');
      Carrito.attributes[4].value = `¡Tienes ${user.products.length} Productos actualmente!`;
      $('[data-bs-toggle="tooltip"]').tooltip("dispose");
      $('[data-bs-toggle="tooltip"]').tooltip("enable");
      this.update(user);
    } else {
      console.log("No tengo productos");
      user.products = [];
      let uid = Math.random().toString(16).slice(2);
      user.products.push({ uid, name, type, price });
      this.update(user);
    }
  }
  removeProduct(uid) {
    let user = this.getCurrentUser();
    let newProducts = user.products.filter((product) => product.uid !== uid);
    user.products = newProducts;
    this.update(user);
  }

  getProducts() {}
}
