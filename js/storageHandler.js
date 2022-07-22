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
            console.log("Se ha registrado el usuario con exito");
        }else{
            console.log(`la cedula ${this.id} ya se encuentra registrada`);
        }
    }
    login(){
        console.log(this.findOne(this.id))
    }
}
/*, contacto, cuentas compradas, facutración, reportar cosgincación, reportar fallo de cuenta*/
