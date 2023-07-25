import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then(user => {
      const isAuthenticated = !!user; // Convert the User | null to a boolean
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }
}
