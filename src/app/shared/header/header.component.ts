import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isSignedIn = false;
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
  constructor(
    private AuthService: AuthService,
    private router: Router
  ) {}
  logout() {
    this.AuthService.signOut();
    this.isSignedIn = false;
    this.router.navigate(['/sign-in']);
  }
  toggleSideBar() {
    this.toggleSidebar.emit();
  }
}
