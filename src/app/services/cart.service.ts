import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public menuList = new BehaviorSubject<Menu[]>([]);
  public cartItemList: Menu[] = [];
  itemQuantity = 1;
  constructor() {
    this.menuList.next(this.loadCart());
  }
  getMenuItems() {
    return this.menuList.asObservable();
  }

  setMenuItems(item: Menu[]) {
    this.cartItemList.push(...item);
    this.menuList.next(item);
  }

  addToCart(menu: Menu): boolean {
    try {
      const existingItem = this.checkItem(menu);
      if (existingItem) {
        return true;
      }
      Object.assign(menu, { quantity: this.itemQuantity, total: menu.price });
      this.cartItemList.push(menu);
      this.saveCart();
      this.menuList.next([...this.cartItemList]);
      return false;
    } catch (error) {
      return false;
    }
  }

  checkItem(menu: Menu) {
    const index = this.cartItemList.findIndex(
      (cartItem: { itemName: string }) => cartItem.itemName === menu.itemName
    );
    if (index !== -1) return this.cartItemList[index];
    return null;
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItemList.map((item: Menu) => {
      const itemTotal = item as Menu & { total: number };
      totalPrice += +itemTotal.total;
    });
    return totalPrice;
  }

  removeCartItem(menu: Menu) {
    this.cartItemList = this.cartItemList.filter(
      (a: Menu) => a.itemName !== menu.itemName
    );
    localStorage.setItem('cart-items', JSON.stringify(this.cartItemList));
    this.menuList.next(this.cartItemList);
  }

  removeAllCart() {
    localStorage.clear();
    this.cartItemList = [];
    this.menuList.next(this.cartItemList);
  }

  saveCart() {
    localStorage.setItem('cart-items', JSON.stringify(this.cartItemList));
  }

  loadCart() {
    const cartItemsExist = localStorage.getItem('cart-items') as string;
    if (cartItemsExist) {
      return (this.cartItemList = JSON?.parse(cartItemsExist));
    }
  }

  updateDataLS(quantity: number, updatedPrice: number, item: Menu) {
    const storedData = localStorage.getItem('cart-items');
    if (!storedData) return;
    const updatedArray = JSON.parse(storedData).map((element: Menu) => {
      if (element.itemName === item.itemName) {
        const total = element.price * quantity;
        return { ...element, quantity, total };
      }
      return element;
    });
    localStorage.setItem('cart-items', JSON.stringify(updatedArray));
  }
}
