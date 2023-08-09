import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from 'src/app/model/menu.model';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  displayedColumns = ['no', 'item', 'cost'];

  dataSource = new MatTableDataSource<Menu>();
  totalItem = 0;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    // this.fetchMenu();
    this.cartService.getMenuItems().subscribe(res => {
      this.dataSource.data = res;
      this.totalItem = this.cartService.getTotalPrice();
    });
  }

  getSerialNumber(index: number): number {
    return index;
  }
  /** Gets the total cost of all transactions. */
  // getTotalCost() {
  //   return this.transactions
  //     .map(t => t.cost)
  //     .reduce((acc, value) => acc + value, 0);
  // }
}
