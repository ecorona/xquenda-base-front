import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { noSessionGuard } from './guards/no-session.guard';
import { sessionGuard } from './guards/session.guard';

export default [
  {
    path: 'login',
    canActivate: [noSessionGuard],
    component: LoginPageComponent,
  },
  {
    path: 'forgot-password',
    canActivate: [noSessionGuard],
    component: ForgotPasswordPageComponent,
  },
  {
    path: 'logout',
    canActivate: [sessionGuard],
    component: LogoutPageComponent,
  },
] as Routes;
