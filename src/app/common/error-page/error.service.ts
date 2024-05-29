import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly router = inject(Router);
  private errorMessageSubject = new BehaviorSubject<string>('');

  displayError(errorMessage: string): void {
    this.errorMessage = errorMessage;
    this.router.navigate(['/error-page']);
  }

  set errorMessage(value: string) {
    this.errorMessageSubject.next(value);
  }

  get errorMessage$(): Observable<string> {
    return this.errorMessageSubject.asObservable();
  }
}
