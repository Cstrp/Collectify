import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, User } from '../interfaces';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { signInFailed, signUpFailed, State } from '../../../store';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from '../../../shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private url = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService,
    private readonly store: Store<State>
  ) {}

  public signIn(user: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.url}/authentication/sign-in`, user)
      .pipe(
        tap(res => {
          this.setToken(res.access_token);
        }),
        catchError(err => {
          this.store.dispatch(signInFailed({ error: err }));
          return throwError(err);
        })
      );
  }

  public signUp(user: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.url}/authentication/sign-up`, user)
      .pipe(
        tap(res => {
          this.setToken(res.access_token);
        }),
        catchError(err => {
          this.store.dispatch(signUpFailed({ error: err }));
          return throwError(err);
        })
      );
  }

  public getProfile(): Observable<User> {
    return this.http.get<User>(`${this.url}/authentication/profile`);
  }

  public loginWithGoogle() {
    window.location.href = `${this.url}/authentication/google`;
  }

  public loginWithGithub() {
    window.location.href = `${this.url}/authentication/github`;
  }

  public setToken(token: string) {
    this.cookieService.setAccessToken(token);
  }

  public isAuth(): boolean {
    return !!this.cookieService.getAccessToken();
  }
}
