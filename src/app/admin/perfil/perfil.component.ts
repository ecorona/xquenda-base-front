import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioIdentityDTO } from '../../auth/dto/usuario-identity.dto';
import { AuthService } from '../../auth/services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, JsonPipe],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent {
  userIdentity: UsuarioIdentityDTO | null = null;
  private readonly authService = inject(AuthService);
  constructor() {
    this.userIdentity = this.authService.userIdentity;
  }
}
