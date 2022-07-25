import { miStorage } from './Storage.js';
export class User extends miStorage{
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