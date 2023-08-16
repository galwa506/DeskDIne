import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationLinks } from 'src/app/misc/navigationLink.constant';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  userName!: string;
  userEmail!: string;
  currentUser!: string | null;
  navigationLinks = NavigationLinks;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getCurrentUserEmailUID().subscribe(user => {
      this.currentUser = user.email;
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
