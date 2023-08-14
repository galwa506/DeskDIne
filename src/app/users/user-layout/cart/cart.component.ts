import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { parse } from 'path';
import { Menu } from 'src/app/model/menu.model';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  dataSource = new MatTableDataSource<Menu>();
  displayedColumns = ['no', 'item', 'cost', 'q', 'remove'];
  totalPrice = this.cartService.getTotalPrice();
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
      if (this.cartService.loadCart()) {
        return (this.dataSource.data = this.cartService.loadCart());
      }
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
      this.cartService.updateDataLS(item.quantity, item);
      this.totalPrice += parseInt(item.price);
    } else if (item.quantity > 1 && value === 'min') {
      item.quantity -= 1;
      this.totalPrice -= parseInt(item.price);
    }
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    this.totalPrice -= parseInt(item.price);
  }
  removeAll() {
    Swal.fire({
      icon: 'warning',
      text: 'Are you sure? You won"t be able to revert this!',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.value) return this.cartService.removeAllCart();
    });
  }
}
