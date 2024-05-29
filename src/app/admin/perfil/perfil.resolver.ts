import { ResolveFn } from '@angular/router';
import { UsuarioIdentityDTO } from '../../auth/dto/usuario-identity.dto';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

export const perfilResolver: ResolveFn<UsuarioIdentityDTO> = (route, state) => {
  return inject(AuthService).getPerfil();
};
