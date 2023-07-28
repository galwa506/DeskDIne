import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  count = 0;
  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) {}
  getUserCount(): Observable<number> {
    return new Observable<number>(observer => {
      this.db
        .list('/users')
        .snapshotChanges()
        .subscribe(res => {
          res.forEach(action => {
            const value = action.payload.val() as {
              name: string;
              role: number;
            };
            const role = value.role;
            if (role === 0) {
              this.count++;
            }
          });
          observer.next(this.count);
          observer.complete();
        });
    });
  }
}
