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
  displayedColumns = ['no', 'item', 'cost', 'q'];
  dataSource = new MatTableDataSource<Menu>();
  totalItem = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchMenuItems();
  }

  fetchMenuItems() {
    this.cartService.getMenuItems().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.data.forEach(item => {
        const existingItem = this.cartService.checkItem(item);
        if (existingItem) {
          Object.assign(item, { quantity: existingItem.quantity });
        } else {
          Object.assign(item, { quantity: 1 });
        }
      });
      this.totalItem = this.cartService.getTotalPrice();
    });
  }

  getSerialNumber(index: number): number {
    return index + 1;
  }

  quantity(value: string, item: any) {
    if (item.quantity < 50 && value === 'max') {
      item.quantity += 1;
    } else if (item.quantity > 1 && value === 'min') {
      item.quantity -= 1;
    }
  }
}
