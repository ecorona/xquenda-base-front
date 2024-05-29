import { Component } from '@angular/core';
import { NavBasicoComponent } from './nav/nav-basico.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBasicoComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
