import { Component } from '@angular/core';
import {LoginService} from "../../servicios/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private loginService: LoginService) {}

  onSubmit() {
    this.loginService.login(this.email, this.password)
      .subscribe(
        () => {
          // Éxito: redirigir a la página de simulaciones
          this.error = '';
        },
        error => {
          // Error: mostrar mensaje de error
          this.error = error.message;
        }
      );
  }
}
