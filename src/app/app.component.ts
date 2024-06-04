import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { BasicoComponent } from './layout/basico/basico.component';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from './auth/services/auth.service';
import { SocketService } from './common/services/web-socket.service';
import { AuthUtils } from './auth/auth.utils';
import { Subject, filter, takeUntil } from 'rxjs';
import { EventosAdmin } from './common/services/eventos-admin.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, BasicoComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly socketService = inject(SocketService);

  private unsubscribeAll: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
    if (
      this.authService.token &&
      !AuthUtils.isTokenExpired(this.authService.token)
    ) {
      this.socketService.setToken(this.authService.token);
    }
  }

  ngOnInit(): void {
    const eventosFiltrados: Array<EventosAdmin> = [
      EventosAdmin.usuario_entrando,
      EventosAdmin.usuario_saliendo,
    ];
    this.socketService.events$
      .pipe(
        takeUntil(this.unsubscribeAll),
        filter((event) => eventosFiltrados.includes(event.event))
      )
      .subscribe({
        next: (event) => {
          console.log('Evento en appComponent: ', event);
        },
      });
  }

  layout = 'basico';
}
