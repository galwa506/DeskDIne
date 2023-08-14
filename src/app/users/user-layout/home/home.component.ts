import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { CartService } from 'src/app/services/cart.service';
import { Menu } from 'src/app/model/menu.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isSignedIn = false;
  itemName = '';
  price = 0;
  sdf = 'hi';
  image!: Promise<string | void>;
  menuList: Menu[] = [];
  constructor(
    private menu: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchMenuList();
  }

  fetchMenuList() {
    this.menu.fetchMenu().subscribe(res => {
      this.menuList = res;
      this.menuList.forEach(a => {
        Object.assign(a, { total: a.price });
      });
    });
  }

  addToCart(item: Menu) {
    const itemExist = this.cartService.addToCart(item);
    if (itemExist) {
      Swal.fire({
        icon: 'error',
        text: 'Item already exists in the cart!',
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: 'success',
        text: 'Item added to cart!',
        showConfirmButton: false,
      });
    }
  }
}
