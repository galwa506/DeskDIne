import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isSignedIn = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private db: AngularFireDatabase
  ) {}
  async onSignIn(email: string, password: string) {
    try {
      const userCredential = await this.authService.signIn(email, password);
      const user = userCredential.user;
      const userSnapshot = await this.db.database
        .ref('users/' + user?.uid)
        .once('value');
      const userData = userSnapshot.val();
      console.log(userData);
      if (userData.role === 0) {
        this.isSignedIn = true;
        Swal.fire({
          icon: 'success',
          text: 'Success! Registration complete!',
          showConfirmButton: false,
          timer: 1500, // Duration in milliseconds (1 second)
        });
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/admin-dashboard']);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong!',
        showConfirmButton: false,
        timer: 1500, // Duration in milliseconds (1 second)
      });
    }
  }
}
