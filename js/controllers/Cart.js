import { miStorage } from "./Storage.js";
export class Cart extends miStorage {
  constructor(name, type, price) {
    super(Cart.name);
    this.name = name;
    this.type = type;
    this.price = price;
  }
  addProduct() {}
}
