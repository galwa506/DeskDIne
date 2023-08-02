export class Menu {
  itemName!: string;
  price!: number;
  image!: File;

  constructor(itemName: string, price: number, image: File) {
    this.itemName = itemName;
    this.price = price;
    this.image = image;
  }
}
