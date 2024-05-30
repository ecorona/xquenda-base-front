import { AfterViewInit, Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logout-page.component.html',
})
export class LogoutPageComponent implements AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  tiempoRestante = 5;

  ngAfterViewInit(): void {
    this.authService.logout();
    this.countDown();
  }

  countDown() {
    let seconds = 5;
    const interval = setInterval(() => {
      seconds--;
      this.tiempoRestante = seconds;
      if (seconds === 0) {
        clearInterval(interval);
        this.router.navigate(['/'], { replaceUrl: true, relativeTo: null });
      }
    }, 1000);
  }
}
