export class Menu {
  itemName!: string;
  price!: number;

  constructor(itemName: string, price: number) {
    this.itemName = itemName;
    this.price = price;
  }
}
