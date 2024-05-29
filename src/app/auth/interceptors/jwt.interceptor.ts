import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthUtils } from '../auth.utils';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  let newReq = req.clone();

  if (authService.token && !AuthUtils.isTokenExpired(authService.token)) {
    newReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authService.token),
    });
  }

  return next(newReq).pipe(
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
