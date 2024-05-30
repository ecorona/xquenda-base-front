import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { LoginRequestDto } from '../dto/login-request.dto';
import { Observable, tap } from 'rxjs';
import { LoginResponseDTO } from '../dto/login-response.dto';
import { environment } from '../../../environments/environment.development';
import { UsuarioIdentityDTO } from '../dto/usuario-identity.dto';
import { SocketService } from '../../common/services/web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSignal = signal<UsuarioIdentityDTO | null>(null);
  private readonly http = inject(HttpClient);
  private readonly socketService = inject(SocketService);

  login(body: LoginRequestDto): Observable<LoginResponseDTO> {
    return this.http
      .post<LoginResponseDTO>(`${environment.api}/api/v1/auth/login`, body)
      .pipe(
        tap((response) => {
          this.token = response.access_token;
          this.socketService.setToken(response.access_token);
        })
      );
  }

  getPerfil(): Observable<UsuarioIdentityDTO> {
    return this.http
      .get<UsuarioIdentityDTO>(`${environment.api}/api/v1/auth/perfil`)
      .pipe(
        tap((response) => {
          this.userIdentity = response;
        })
      );
  }

  logout(): void {
    this.token = null;
    this.userIdentity = null;
    this.socketService.setToken('');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  private set token(value: string | null) {
    if (!value) {
      localStorage.removeItem('token');
      return;
    }
    localStorage.setItem('token', value);
  }

  get isLogged(): boolean {
    return !!this.token;
  }

  get userIdentity(): UsuarioIdentityDTO | null {
    const userTxt = localStorage.getItem('user');
    if (!userTxt) {
      this.userSignal.set(null);
      return null;
    }
    const userJson: UsuarioIdentityDTO = JSON.parse(userTxt);
    this.userSignal.set(userJson);
    return userJson;
  }

  set userIdentity(value: UsuarioIdentityDTO | null) {
    if (!value) {
      localStorage.removeItem('user');
      this.userSignal.set(null);
      return;
    }
    this.userSignal.set(value);
    localStorage.setItem('user', JSON.stringify(value));
  }
}
