import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isSignedIn = false;
  itemName = '';
  price = 0;
  image!: Promise<string | void>;
  menuList: any[] = [];
  constructor(
    private AuthService: AuthService,
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

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
}
