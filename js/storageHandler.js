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
        items.push(data);
        this.create(items)
        return 1;
    }
    findOne(id){
        this.items=JSON.parse(this.database.getItem(this.key));
        let oneItem = this.items.find(element=>element.id===id);
        return oneItem;
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
        name,
        lastName,
        second_name,
        second_lastName,
        id
        ){
        super(User.name);
        this.name=name;
        this.lastName=lastName;
        this.second_name=second_name;
        this.second_lastName=second_lastName;
        this.id=id;
        this.logged=false;
    }
    getFullName(){
        return `${this.name} ${this.second_name} ${this.lastName} ${this.second_lastName}`
    }
    register(){
        let registerData={
            name:this.name,
            lastName:this.lastName,
            second_name:this.second_name,
            second_lastName:this.second_lastName,
            id:this.id,
        }
        if(this.create(registerData)){
            // console.log("Se ha registrado el usuario con exito");
        }else{
            // console.log(`la cedula ${this.id} ya se encuentra registrada`);
        }
    }
    login(){
        // console.log(this.findOne(this.id))
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
                      <a href="#" class="btn btn-primary">${element.precio}</a>
                    </div>
                  </div>
                </div>
                `
            })
            this.productos=productos;
            console.log(this.create(this.misproductos));
        })
        
    }
}

    let productos = new Products();

/*, contacto, cuentas compradas, facutración, reportar cosgincación, reportar fallo de cuenta*/
