import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import * as AuthActions from './auth.actions';
import { AuthState } from './types';

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.signInSuccess,
    (state, { res }): AuthState => ({
      ...state,
      dto: res.dto,
      access_token: res.access_token,
      error: null,
    })
  ),
  on(
    AuthActions.signInFailed,
    (state, { error }): AuthState => ({ ...state, error })
  ),
  on(
    AuthActions.signUpSuccess,
    (state, { res }): AuthState => ({
      ...state,
      access_token: res.access_token,
      dto: res.dto,
      error: null,
    })
  ),
  on(
    AuthActions.signUpFailed,
    (state, { error }): AuthState => ({ ...state, error })
  ),
  on(
    AuthActions.setTokenSuccess,
    (state, { access_token }): AuthState => ({
      ...state,
      access_token,
      error: null,
    })
  ),
  on(
    AuthActions.setTokenFailed,
    (state, { error }): AuthState => ({ ...state, error })
  ),
  on(
    AuthActions.getProfileSuccess,
    (state, { user }): AuthState => ({
      ...state,
      dto: user,
      error: null,
    })
  ),
  on(AuthActions.logout, (): AuthState => initialState)
);
