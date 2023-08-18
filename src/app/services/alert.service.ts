import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  confirmAlert() {
    return Swal.fire({
      icon: 'warning',
      text: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    });
  }
  successAlert() {
    return Swal.fire({
      icon: 'success',
      text: 'Ordered Successfully',
      showConfirmButton: false,
    });
  }
}
