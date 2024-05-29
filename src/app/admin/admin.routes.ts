import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';

export default [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
] as Routes;
