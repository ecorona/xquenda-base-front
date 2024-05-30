import { AfterViewInit, Component, inject } from '@angular/core';
import { BasicoComponent } from './layout/basico/basico.component';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from './auth/services/auth.service';
import { SocketService } from './common/services/web-socket.service';
import { AuthUtils } from './auth/auth.utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, BasicoComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly socketService = inject(SocketService);
  ngAfterViewInit(): void {
    if (
      this.authService.token &&
      !AuthUtils.isTokenExpired(this.authService.token)
    ) {
      this.socketService.setToken(this.authService.token);
    }
  }
  layout = 'basico';
}
