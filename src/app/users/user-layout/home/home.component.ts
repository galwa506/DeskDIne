import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isSignedIn = false;
  itemName!: string;
  price!: number;
  image!: Promise<string | void>;
  menuList: any[] = [];
  constructor(
    private AuthService: AuthService,
    private menu: MenuService
  ) {}

  ngOnInit(): void {
    this.fetchMenuList();
  }

  fetchMenuList() {
    this.menu.fetchMenu().subscribe(res => {
      this.menuList = res;
    });
  }
}
