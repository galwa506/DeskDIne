import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public menuList = new BehaviorSubject<any>([]);

  getMenuItems() {
    return this.menuList.asObservable();
  }

  // setMenuItems(menu: any) {
  //   this.cartItemList.push(...menu);
  //   this.menuList.next(menu);
  // }

  addToCart(menu: any) {
    const existingItem = this.checkItem(menu);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      menu.quantity = 1;
      this.cartItemList.push(menu);
    }
    this.menuList.next(this.cartItemList);
    this.getTotalPrice();
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
      if (menu.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
  }

  removeAllCart() {
    this.cartItemList = [];
    this.menuList.next(this.cartItemList);
  }
}
