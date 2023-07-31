import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, mergeMap, of, switchMap } from 'rxjs';
import { Menu } from '../admin/add-menu/model/menu.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  checkItem(itemName: string): Observable<Menu | null> {
    return this.http
      .get<{ [key: string]: Menu }>(environment.baseUrl + 'menu.json')
      .pipe(
        map(res => {
          const items = res ? Object.values(res) : [];
          const foundItem = items.find(
            item => (item as Menu).itemName === itemName
          );
          return foundItem || null;
        })
      );
  }
  addItem(menu: Menu): Observable<any> {
    return this.checkItem(menu.itemName).pipe(
      switchMap(res => {
        if (res === null) {
          if (menu.itemName === null || menu.price === null) {
            return Swal.fire({
              icon: 'error',
              text: 'Please fill out all the details!',
              showConfirmButton: false,
              timer: 1500,
            });
          }
          Swal.fire({
            icon: 'success',
            text: 'Item added successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
          return this.http.post(environment.baseUrl + `menu.json`, menu).pipe(
            mergeMap(() => {
              return of(menu);
            })
          );
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Item with the same name already exists',
            showConfirmButton: false,
            timer: 1500,
          });
          return of({ message: 'Item with the same name already exists.' });
        }
      })
    );
  }
}
