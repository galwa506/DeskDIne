import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isSignedIn = false;
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private db: AngularFireDatabase
  ) {}
  async onSignUp(email: string, password: string, name: string) {
    try {
      const userCredential = await this.AuthService.signUp(email, password);
      const user = userCredential.user;
      // if (this.AuthService.isLoggedIn) {
      this.isSignedIn = true;
      const userData = {
        name: name,
        role: 0,
      };
      this.db.database.ref('users/' + user?.uid).set(userData);
      Swal.fire({
        icon: 'success',
        text: 'Success! Registration complete!',
        showConfirmButton: false,
        timer: 1500, // Duration in milliseconds (1 second)
      });
      this.router.navigate(['/sign-in']);
      // }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred during registration. Please try again later.',
        showConfirmButton: false,
        timer: 1500, // Duration in milliseconds (1 second)
      });
    }
  }
}
