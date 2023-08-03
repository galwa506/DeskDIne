export class Menu {
  itemName!: string;
  price!: number;
  image!: Promise<string>;

  constructor(itemName: string, price: number, image: Promise<string>) {
    this.itemName = itemName;
    this.price = price;
    this.image = image;
  }
}
