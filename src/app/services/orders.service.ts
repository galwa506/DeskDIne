import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Orders } from '../model/order.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
  ) {}

  postOrders(orders: Orders) {
    return this.http.post(environment.baseUrl + `orders.json`, orders);
  }

  getItemDetails() {
    return localStorage.getItem('cart-items');
  }
}
