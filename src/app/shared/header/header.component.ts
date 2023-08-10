import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
  isSignedIn = false;
  id = 0;
  totalItem = 0;
  loc = this.location.path().indexOf('/user') > -1;
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.idParams();
    this.fetchMenu();
  }

  idParams() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  logout() {
    this.AuthService.signOut();
    this.isSignedIn = false;
    this.router.navigate(['/sign-in']);
  }
  toggleSideBar() {
    this.toggleSidebar.emit();
  }

  cart() {
    this.router.navigate(['cart'], { relativeTo: this.route });
  }
  link() {
    if (this.location.path().indexOf('/admin') > -1) {
      return this.router.navigate(['/admin/dashboard']);
    }
    return this.router.navigate(['/user/', this.id, 'home']);
  }

  fetchMenu() {
    this.cartService.getMenuItems().subscribe(res => {
      this.totalItem = res.length;
    });
  }
}
