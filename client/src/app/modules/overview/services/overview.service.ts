import { selectRouterState, signInSuccess, State } from '../../../store';
import { AuthResponse } from '../../authentication';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from '../../../shared/services';

@Injectable({
  providedIn: 'any',
})
export class OverviewService {
  private url = this.store.select(selectRouterState);

  constructor(
    private readonly cookieService: CookieService,
    private readonly store: Store<State>,
    private readonly router: Router
  ) {}

  public getUserData() {
    this.url.subscribe(state => {
      const queryParams = new URLSearchParams(state.state.url.split('?')[1]);
      const data = queryParams.get('data');

      if (data) {
        const decodedData: { user: AuthResponse } = JSON.parse(
          decodeURIComponent(data)
        );

        if (decodedData.user && decodedData.user.access_token) {
          this.saveAccessToken(decodedData.user?.access_token);
          this.dispatchSignInSuccess(decodedData.user);
        }
      }
    });
  }

  private saveAccessToken(accessToken: string): void {
    this.cookieService.setAccessToken(accessToken);
  }

  private dispatchSignInSuccess(user: AuthResponse): void {
    const token = this.cookieService.getAccessToken();

    this.store.dispatch(
      signInSuccess({
        res: {
          access_token: user.access_token,
          dto: user.dto,
        },
      })
    );
  }
}
