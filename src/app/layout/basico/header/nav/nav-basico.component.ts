import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { UsuarioIdentityDTO } from '../../../../auth/dto/usuario-identity.dto';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-nav-basico',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavBasicoComponent,
  ],
  templateUrl: './nav-basico.component.html',
})
export class NavBasicoComponent {
  private readonly authService = inject(AuthService);
  appTitle = environment.appTitle;
  userIdentity: UsuarioIdentityDTO | null = null;
  constructor() {
    const tmp = this.authService.userIdentity;
    effect(() => {
      this.userIdentity = this.authService.userSignal();
    });
  }
}
