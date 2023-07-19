import { AuthResponse, Token, User } from '../../modules';
import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AUTH_ACTIONS } from './types';

export const signInStart = createAction(
  AUTH_ACTIONS.SIGN_IN_START,
  props<{ user: User }>()
);
export const signInSuccess = createAction(
  AUTH_ACTIONS.SIGN_IN_SUCCESS,
  props<{ res: AuthResponse }>()
);
export const signInFailed = createAction(
  AUTH_ACTIONS.SIGN_IN_FAILED,
  props<{ error: HttpErrorResponse }>()
);

export const signUpStart = createAction(
  AUTH_ACTIONS.SIGN_UP_START,
  props<{ user: User }>()
);
export const signUpSuccess = createAction(
  AUTH_ACTIONS.SIGN_UP_SUCCESS,
  props<{ res: AuthResponse }>()
);
export const signUpFailed = createAction(
  AUTH_ACTIONS.SIGN_UP_FAILED,
  props<{ error: HttpErrorResponse }>()
);

export const setTokenStart = createAction(AUTH_ACTIONS.SET_TOKEN_START);
export const setTokenSuccess = createAction(
  AUTH_ACTIONS.SET_TOKEN_SUCCESS,
  props<{ access_token: Token }>()
);
export const setTokenFailed = createAction(
  AUTH_ACTIONS.SET_TOKEN_FAILED,
  props<{ error: HttpErrorResponse }>()
);

export const getProfile = createAction(AUTH_ACTIONS.GET_PROFILE);
export const getProfileSuccess = createAction(
  AUTH_ACTIONS.GET_PROFILE_SUCCESS,
  props<{ user: User }>()
);
export const getProfileFailed = createAction(
  AUTH_ACTIONS.GET_PROFILE_FAILED,
  props<{ error: HttpErrorResponse }>()
);
export const logout = createAction(AUTH_ACTIONS.LOG_OUT);
export const logoutSuccess = createAction(AUTH_ACTIONS.LOG_OUT_SUCCESS);
