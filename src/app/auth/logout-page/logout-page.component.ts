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
  loggedOut = false;

  ngAfterViewInit(): void {
    this.authService.logout();
    this.loggedOut = true;
    setTimeout(() => {
      this.router.navigate(['/'], { replaceUrl: true, relativeTo: null });
    }, 5000);
  }
}
