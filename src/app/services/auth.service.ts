import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential, User } from '@firebase/auth-types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../shared/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private http: HttpClient
  ) {}

  signIn(email: string, password: string): Promise<UserCredential> {
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

  forgotPassword(email: string): Promise<void> {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }
  getCurrentUserUid(): Observable<string | null> {
    return new Observable<string | null>(observer => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          observer.next(user.uid);
          observer.next(user.email);
        } else {
          observer.next(null);
        }
      });
      return () => unsubscribe();
    });
  }

  findUserByUid(emailToFind: string) {
    return this.http
      .get<{ [key: string]: UserInterface }>(environment.baseUrl + 'users.json')
      .pipe(
        map(res =>
          Object.values(res).find(
            user => (user as UserInterface).email === emailToFind
          )
        )
      );
  }
}
