import { Component } from '@angular/core';

export interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {}
