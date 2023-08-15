import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
    });
  }

  getSerialNumber(index: number): number {
    return index + 1;
  }

  getQuantity(value: string, item: Menu) {
    const itemDetail = item as Menu & { quantity: number; total: number };
    const price = +item.price;
    if (value === 'max' && itemDetail.quantity < 50) {
      this.changeQuantityAndTotal(itemDetail, 1, price);
      this.totalPrice += price;
    } else if (value === 'min' && itemDetail.quantity > 1) {
      this.changeQuantityAndTotal(itemDetail, -1, price);
      this.totalPrice -= price;
    }
  }

  private changeQuantityAndTotal(
    itemDetail: Menu & { quantity: number; total: number },
    change: number,
    price: number
  ) {
    itemDetail.quantity += change;
    itemDetail.total = +itemDetail.total + change * price;
    this.cartService.updateDataLS(
      itemDetail.quantity,
      itemDetail.total,
      itemDetail
    );
  }

  removeItem(item: Menu) {
    const itemTotal = item as Menu & { total: number };
    this.cartService.removeCartItem(item);
    this.totalPrice -= +itemTotal.total;
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
