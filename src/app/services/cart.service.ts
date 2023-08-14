import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public menuList = new BehaviorSubject<any>([]);

  getMenuItems() {
    return this.menuList.asObservable();
  }

  setMenuItems(item: any) {
    this.cartItemList.push(...item);
    this.menuList.next(item);
  }
  addToCart(menu: any): boolean {
    try {
      const existingItem = this.checkItem(menu);
      if (existingItem) {
        existingItem.quantity;
        this.saveCart();
        return true;
      } else {
        menu.quantity = 1;
        this.cartItemList.push(menu);
        this.saveCart();
      }
      this.menuList.next(this.cartItemList);
      this.getTotalPrice();
      return false;
    } catch (error) {
      return false;
    }
  }
  checkItem(menu: any) {
    const index = this.cartItemList.findIndex(
      (cartItem: { itemName: any }) => cartItem.itemName === menu.itemName
    );
    if (index !== -1) return this.cartItemList[index];
    return null;
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItemList.map((item: any) => {
      totalPrice += parseInt(item.total);
    });
    return totalPrice;
  }

  removeCartItem(menu: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (menu.itemName === a.itemName) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.menuList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = [];
    localStorage.clear();
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
}
