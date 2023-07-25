import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  forgotPassword(email: string) {
    const userEmail = this.authService.forgotPassword(email);
    userEmail.then(
      () => {
        Swal.fire({
          icon: 'success',
          text: 'Success! Check your email!',
          showConfirmButton: false,
          timer: 1500, // Duration in milliseconds (1 second)
        });
        this.router.navigate(['/sign-in']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500, // Duration in milliseconds (1 second)
        });
      }
    );
  }
}
