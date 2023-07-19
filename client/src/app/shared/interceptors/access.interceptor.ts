import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../../modules';
import { CookieService } from '../services';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AccessInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly authService: AuthenticationService,
    private readonly cookieService: CookieService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const access_token = this.cookieService.getAccessToken();
    const isAuth = this.authService.isAuth();

    if (access_token && isAuth) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    }

    return next
      .handle(request)
      .pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/sign-in']);
    }

    return throwError(error);
  }
}
