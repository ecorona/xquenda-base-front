import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const req2 = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.token}`,
    },
  });
  return next(req2).pipe(
    catchError((error) => {
      // Catch "401 Unauthorized" responses
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.logout();
        location.reload();
      }

      return throwError(error);
    })
  );
};
