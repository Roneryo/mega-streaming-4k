export class miStorage{
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