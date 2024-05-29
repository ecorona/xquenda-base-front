import { Component } from '@angular/core';
import { BasicoComponent } from './layout/basico/basico.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, BasicoComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  layout = 'basico';
}
