import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; // Importa el Router

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    // Comprobar el estado de autenticación actual al inicializar el servicio
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
          observer.next(); // Envía una notificación de éxito al completar la autenticación
          observer.complete();
          this.router.navigate(['/simulaciones']); // Redirige al usuario a la página de simulaciones
        })
        .catch(error => {
          observer.error(error); // Envía un mensaje de error si la autenticación falla
        });
    });
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.signOut()
        .then(() => {
          this.loggedIn.next(false);
          observer.next(); // Envía una notificación de éxito al cerrar sesión
          observer.complete();
        })
        .catch(error => {
          observer.error(error); // Envía un mensaje de error si cerrar sesión falla
        });
    });
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
