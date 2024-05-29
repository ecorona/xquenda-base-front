import { Routes } from '@angular/router';
import { LandingPageComponent } from './common/landing-page/landing-page.component';
import { NotfoundPageComponent } from './common/notfound-page/notfound-page.component';
import { perfilResolver } from './admin/perfil/perfil.resolver';
import { sessionGuard } from './auth/guards/session.guard';
import { noSessionGuard } from './auth/guards/no-session.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  {
    path: 'landing-page',
    canActivate: [noSessionGuard],
    component: LandingPageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'admin',
    canActivate: [sessionGuard],
    resolve: {
      perfil: perfilResolver,
    },
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: '**',
    component: NotfoundPageComponent,
  },
];
