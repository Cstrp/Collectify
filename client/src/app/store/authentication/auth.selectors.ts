import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_NAME } from './auth.state';
import { AuthState } from './types';

export const selectAuthState =
  createFeatureSelector<AuthState>(AUTH_FEATURE_NAME);

export const selectUser = createSelector(selectAuthState, state => state.dto);

export const selectIsAuth = createSelector(
  selectAuthState,
  state => !!state.access_token
);

export const selectError = createSelector(
  selectAuthState,
  state => state.error
);
