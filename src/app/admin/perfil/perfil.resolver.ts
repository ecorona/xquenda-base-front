import { ResolveFn } from '@angular/router';
import { UsuarioIdentityDTO } from '../../auth/dto/usuario-identity.dto';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

export const perfilResolver: ResolveFn<UsuarioIdentityDTO> = (route, state) => {
  const authService = inject(AuthService);
  const userLoaded = authService.userSignal();
  if (userLoaded?.id) {
    return userLoaded;
  }
  return authService.getPerfil();
};
