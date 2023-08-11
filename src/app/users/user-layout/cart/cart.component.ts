import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/model/menu.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  dataSource = new MatTableDataSource<Menu>();
  displayedColumns = ['no', 'item', 'cost', 'q', 'remove'];
  totalItem = this.cartService.getTotalPrice();
  id = 0;
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMenuItems();
  }

  toHome() {
    const id = this.router.url.split('/')[2];
    return this.router.navigate(['/user/', id, 'home']);
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
    });
  }

  getSerialNumber(index: number): number {
    return index + 1;
  }

  getQuantity(value: string, item: any) {
    if (item.quantity < 50 && value === 'max') {
      item.quantity += 1;
      this.totalItem += parseInt(item.price);
    } else if (item.quantity > 1 && value === 'min') {
      item.quantity -= 1;
      this.totalItem -= parseInt(item.price);
    }
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
}
