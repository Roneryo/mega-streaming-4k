//Yo aca tratando de aplicar S.O.L.I.D
class miStorage{
    constructor(key){
        this.database = window.localStorage;
        this.items=[];
        this.key=key;
    }
    create(data){
        let users = this.database.getItem(this.key)
        if(users){
            if(this.findOne(data.id)) return false;
            // this.items=users;
            this.items.push(data);
            this.database.setItem(this.key,JSON.stringify(this.items));
        }
        else{
            this.items.push(data);
            this.database.setItem(this.key,JSON.stringify(this.items));
        }
        return true;
    }
    update(data){
        this.items = JSON.parse(this.database.getItem(this.key));
        this.items = this.items.filter(element=>element.id!=data.id)
        this.items.push(data);
        this.database.setItem(this.key,JSON.stringify(this.items));
        return 1;
    }
    findOne(id){
        this.items=JSON.parse(this.database.getItem(this.key));
        let oneItem = this.items.find(element=>element.id==id);
        return oneItem;
    }
    getAll(){
        this.items=JSON.parse(this.database.getItem(this.key));
        return this.items;
    }
    delete(id){
        this.items=JSON.parse(this.database.getItem(this.key));
        let newList = this.items.filter(element=>element.id!==id);
        this.database.setItem(this.key,newList);
    }

}
//sesión, registro
class User extends miStorage{
    constructor(
        email,
        name,
        lastName,
        password,
        birthdate,
        gender,
        id
        ){
        super(User.name);
        this.name=name;
        this.lastName=lastName;
        this.password=password;
        this.id=id;
        this.birthdate=birthdate??"";
        this.gender=gender??"";
        this.email=email;
        this.logged=false;
    }
    getFullName(){
        return `${this.name} ${this.second_name} ${this.lastName} ${this.second_lastName}`;
        
    }
    register(){
        let registerData={
            name:this.name,
            lastName:this.lastName,
        // second_name:this.second_name,
        // second_lastName:this.second_lastName,
            password:this.password??"",
            birthdate:this.birthdate??"",
            email:this.email??"",
            gender:this.gender??"",
            id:this.id,
            logged:false

        }
        if(this.create(registerData)){
            // console.log("Se ha registrado el usuario con exito");
        }else{
            // console.log(`la cedula ${this.id} ya se encuentra registrada`);
        }
    }
    login(e){
        // console.log(this.findOne(this.id))
    }
    logOut(){
        let userLoged = this.getAll();
        if(userLoged)
        userLoged= userLoged.filter(user=>user.logged);
        userLoged[0].logged=false;
        console.log(userLoged);
        this.update(userLoged[0]);
    }
    isLogged(){
        let userLoged = this.getAll();
        if(userLoged)
        userLoged= userLoged.filter(user=>user.logged);
        console.log(userLoged)
        return userLoged.length>0;

    }
}
class Products extends miStorage{
    misproductos=[];
    constructor(){
        super(Products.name)
        fetch("/js/productos.json")
        .then(jsonProductos=>jsonProductos.json())
        .then(productos=>{
            Object.entries(productos).forEach(producto=>{
                for(let i=0;i<3;i++){
                    // console.log(producto)
                    let tipo = Math.floor(Math.random() * 3)+1;
                    // console.log(tipo)
                    let precio=0;
                    switch(tipo){
                        case 1:
                            precio=producto[1].precio;
                            break;
                        case 2:
                            precio=producto[1].precio*tipo;
                            break;
                        case 3:
                            precio=producto[1].precio*tipo;
                            break;
                        case 4:
                            precio=producto[1].precio*tipo;
                            break;                        
                        }
                        // console.log(producto[1].tipo);
                    this.misproductos.push({
                        nombre:producto[0],
                        tipo:`${producto[1].tipo[tipo-1]} P`,
                        image:`img/${producto[0]}.png`,
                        precio,
                    })
                }
                
            })
            let cartas=document.querySelector('#my-cards');
            this.misproductos.forEach(element=>{
                console.log(element);
                cartas.innerHTML+=`
                <div class="my-3 col-lg-2 col-sm-4 col-xs-6">
                  <div class="card text-center" style="width: 15rem;">
                    <img class="card-img-top" src="${element.image}" alt="Card image cap">
                    <div class="card-body">
                      <h6 class="card-title">${element.nombre.toUpperCase()} ${element.tipo}</h6>
                      <a href="#" class="btn btn-primary" onclick=''>${element.precio}</a>
                    </div>
                  </div>
                </div>
                `
            })
            this.productos=productos;
            console.log(this.create(this.misproductos));
        })
    }
    example(){
        console.log("example")
    }
}
class Cart extends miStorage{
    constructor(){
        super(Cart.name)
    }
}
if(window.location.pathname.split('/').find(el=>el==='index.html' )
/*||
window.location.pathname.split('/').find(el=>el==='mega-streaming-4k')*/){
    let persona=new User();
    let saludo =document.querySelector("#user");
    let usuarioActual = persona.getAll().find(usuario=>usuario.logged)[0];
    console.log(usuarioActual);
    saludo = saludo.innerHTML=`Bienvenido ${usuarioActual.name.toUpperCase()} ${usuarioActual.lastName.toUpperCase()} `
    if(persona.isLogged()){
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
}
if(window.location.pathname.split('/').find(el=>el==='login.html')){
    let persona=new User();
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
                window.location.href="/index.html"
                
            }
        }else{
            console.log("Usuario o contraseña invalido")
        }

           
    })
    
 
}
if(window.location.pathname.split('/').find(el=>el==='registro.html')){
    
    console.log("registro");

    let registrar = document.querySelector("#registrar");
    registrar.addEventListener("click",(e)=>{
        let email=document.querySelector("#correo").value;
        let name=document.querySelector("#nombre").value;
        let lastName=document.querySelector("#apellido").value;
        let password=document.querySelector("#password").value;
        let birthdate=document.querySelector("#fechadenacimiento").value;
        let gender = document.querySelectorAll('[type="radio"]')
        gender = [...gender].find(element=>element.checked);
        gender=gender.value;
        let id=document.querySelector("#cedula").value;
    
        e.preventDefault();
        console.log(email,name,lastName,password,birthdate,gender,id)
        let persona = new User(email,name,lastName,password,birthdate,gender,id)
        persona.register()
        persona.login()
        window.location.href="/index.html"
        
        
    })
    // let persona = new User(
    //     email,
    //     name,
    //     lastName,
    //     password,
    //     birthdate,
    //     gender,
    //     id
    //     )
    
}
/*, contacto, cuentas compradas, facutración, reportar cosgincación, reportar fallo de cuenta*/

/*
let datos ={
    name:"Roner",
    lasName:"Ortega",
    password:1234,
    id:1083051959,
}
let persona = new User(datos.name,datos.lastName,datos.password,datos.id)
persona.register();
*/