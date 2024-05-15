import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    // @ts-ignore
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      this.loggedIn.next(!!user);
    });
  }

  // Método para iniciar sesión con correo electrónico y contraseña
  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
          this.loggedIn.next(true);
          observer.next();
          observer.complete();
          this.router.navigate(['/simulaciones']);
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.signOut()
        .then(() => {
          this.loggedIn.next(false);
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
