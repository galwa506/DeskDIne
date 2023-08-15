import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Orders } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  onPostOrders(orders: Orders) {
    this.http
      .post(environment.baseUrl + `orders.json`, orders)
      .subscribe(res => {});
  }
}
