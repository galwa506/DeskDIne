import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DeskDine';
  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) {}
}
