export class Menu {
  itemName: string;
  price: number;
  image: Promise<string | void>;

  constructor(itemName: string, price: number, image: Promise<string | void>) {
    this.itemName = itemName;
    this.price = price;
    this.image = image;
  }
}
