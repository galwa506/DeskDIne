import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isSignedIn = false;
  constructor(
    private AuthService: AuthService,
    private router: Router
  ) {}
  logout() {
    this.isSignedIn = false;
    this.AuthService.signOut();
    this.router.navigate(['/sign-in']);
  }
}
