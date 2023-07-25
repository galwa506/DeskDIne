import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential, User } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  constructor(private firebaseAuth: AngularFireAuth) {}
  signIn(email: string, password: string): Promise<UserCredential> {
    // await this.firebaseAuth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(res => {
    //     this.isLoggedIn = true;
    //     localStorage.setItem('user', JSON.stringify(res.user));
    //   });
    this.isLoggedIn = true;
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.authState.subscribe((user: User | null) => {
        resolve(!!user);
      }, reject);
    });
  }
}
