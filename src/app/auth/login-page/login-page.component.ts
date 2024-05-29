import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  email = 'super@dominio.com';
  password = '123456';
  error = '';
  cargando = false;
  login() {
    this.error = '';
    this.cargando = true;
    this.authService
      .login({ correo: this.email, contrasenia: this.password })
      .subscribe({
        next: () => {
          console.log('Logged in');
          this.router.navigate(['/admin/home'], { replaceUrl: true });
        },
        error: (error) => {
          this.error = error.message || 'No se pudo iniciar sesión.';
          console.log('Error: ', error.message || 'No se pudo iniciar sesión.');
        },
        complete: () => {
          this.cargando = false;
        },
      });
  }
}
