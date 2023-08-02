import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  userName!: string;
  userEmail!: string;
  currentUser!: string | null;

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getCurrentUserUid().subscribe(email => {
      this.currentUser = email;
      this.currentUser &&
        this.authService.findUserByUid(this.currentUser).subscribe(user => {
          if (user) {
            this.userName = user.name;
            this.userEmail = user.email;
          }
        });
    });
  }
}
