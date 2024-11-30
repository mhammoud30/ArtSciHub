import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);

  // Get token from localStorage
  const token = localStorage.getItem('auth_token');

  // Skip token for public endpoints
  const isPublicEndpoint = [
    '/auth/login',
    '/auth/register',
    '/public'
  ].some(endpoint => req.url.includes(endpoint));

  if (!token || isPublicEndpoint) {
    return next(req);
  }

  // Clone the request and add auth header
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  // Handle the authenticated request
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized
      if (error.status === 401) {
        localStorage.removeItem('auth_token');
        router.navigate(['/login']);
      }

      // Handle 403 Forbidden
      if (error.status === 403) {
        router.navigate(['/portal']); // Redirect to portal home or show access denied
      }

      return throwError(() => error);
    })
  );
};
