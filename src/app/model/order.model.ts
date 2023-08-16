export class Orders {
  userInfo: string | null;
  itemsOrdered: {
    itemName: string;
    price: number;
    quantity: number;
    image: Promise<string | void>;
  };

  constructor(
    userInfo: string | null,
    itemsOrdered: {
      itemName: string;
      price: number;
      quantity: number;
      image: Promise<string | void>;
    }
  ) {
    this.userInfo = userInfo;
    this.itemsOrdered = itemsOrdered;
  }
}
