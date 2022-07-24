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
    exists(){ 
        return this.database.getItem(this.key)!==null;
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
        if(!this.exists()){
            fetch("/js/productos.json")
            .then(jsonProductos=>jsonProductos.json())
            .then(productos=>{
                Object.entries(productos).forEach(producto=>{
                    console.log(producto)
                    for(let i=0;i<3;i++){
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
                            tipo:`${producto[1].tipo[tipo-1]}P`,
                            image:`img/${producto[0]}.png`,
                            precio,
                        })
                    }
                    
                })
                if(this.create(this.misproductos)){
                    this.misproductos=productos;
                    console.log(true)
                }
                this.mostrarProductos();
            })
    
        }else{
            this.mostrarProductos();
        }
    }
    mostrarProductos(){

        let cartas=document.querySelector('#my-cards');
        this.misproductos=this.getAll();
        console.log("xd",this.misproductos);
        this.misproductos[0].forEach(element=>{
            cartas.innerHTML+=`
            <div class="my-3 col-lg-2 col-sm-4 col-xs-6">
              <div class="card text-center" style="width: 15rem;">
                <img class="card-img-top" src="${element.image}" alt="Card image cap">
                <div class="card-body">
                  <h6 class="card-title">${element.nombre.toUpperCase()} ${element.tipo}</h6>
                  <a id="${element.tipo}" class="btn btn-primary ${element.nombre}" onclick=''>${element.precio}</a>
                </div>
              </div>
            </div>
            `
        })
        let netflix = document.querySelectorAll(".netflix")
        netflix.forEach(element=>{
            console.log(element.id);
        });
        let plex = document.querySelectorAll(".plex");
        let HBO = document.querySelectorAll(".Hbo.Max");

        console.log(netflix,plex,HBO);
}
}
class Cart extends miStorage{
    constructor(){
        super(Cart.name)
    }
}
if(location.pathname==='/' || window.location.pathname.split('/').find(el=>el==='index.html') ){
    let persona=new User();
    let saludo =document.querySelector("#user");

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
}

if(window.location.pathname.split('/').find(el=>el==='login.html')){
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
}
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))