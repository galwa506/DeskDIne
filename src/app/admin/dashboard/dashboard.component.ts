import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
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
