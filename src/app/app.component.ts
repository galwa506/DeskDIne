import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DeskDine';
  // results;
  // constructor(
  //   private db: AngularFireDatabase,
  //   private http: HttpClient
  // ) {
  //   this.db.object('users/0').set({ id: 1, name: 'Max Purl', phone: '12344' });
  //   const path = 'https://api.github.com/users/hadley/orgs';
  //   this.results = http.get(path);
  // }

  // onProductCreate(menu: { name: string; price: string }) {
  //   this.http.post(environment.baseUrl + `menu.json`, menu).subscribe(res => {
  //   });
  // }
  constructor(private AuthService: AuthService) {}
}
