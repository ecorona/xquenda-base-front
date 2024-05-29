import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ErrorService } from './error.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-page.component.html',
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  private readonly errorService = inject(ErrorService);
  private unsubscribeAll: Subject<boolean> = new Subject<boolean>();
  errorMessage = '';

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.errorService.errorMessage$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((errorMessage) => {
        this.errorMessage = errorMessage;
      });
  }
}
