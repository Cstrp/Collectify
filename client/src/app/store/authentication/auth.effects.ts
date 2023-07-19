import { AuthenticationService } from '../../modules/authentication/services/authentication.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from '../../shared/services';
import { catchError, map, of, switchMap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { getProfile } from './auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private readonly cookieService: CookieService,
    private router: Router
  ) {}

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInStart),
      switchMap(({ user }) =>
        this.authService.signIn(user).pipe(
          map(res => {
            if (res) {
              this.router.navigate(['/overview']);
              this.cookieService.setAccessToken(res.access_token);
            }

            return AuthActions.signInSuccess({ res });
          }),
          catchError(error => of(AuthActions.signInFailed({ error })))
        )
      )
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUpStart),
      switchMap(({ user }) =>
        this.authService.signUp(user).pipe(
          map(res => {
            if (res) {
              this.router.navigate(['/overview']);
              this.cookieService.setAccessToken(res.access_token);
            }
            return AuthActions.signUpSuccess({ res });
          }),
          catchError(error => of(AuthActions.signUpFailed({ error })))
        )
      )
    );
  });

  getToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.setTokenStart),
      map(() =>
        AuthActions.setTokenSuccess({
          access_token: this.cookieService.getAccessToken(),
        })
      ),
      catchError(error => of(AuthActions.setTokenFailed({ error })))
    );
  });

  getProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProfile),
      switchMap(() => {
        return this.authService.getProfile().pipe(
          map(user => AuthActions.getProfileSuccess({ user })),
          catchError(err => of(AuthActions.getProfileFailed({ error: err })))
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        this.cookieService.rmAccessToken();
        this.router.navigate(['/']);
        return of(AuthActions.logoutSuccess());
      })
    );
  });
}
