import { AuthState } from './types';

export const AUTH_FEATURE_NAME = 'auth';

enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

export const initialState: AuthState = {
  access_token: '',
  dto: {
    id: '',
    username: '',
    email: '',
    password: '',
    avatar: '',
    role: ROLE.USER,
  },
  error: null,
};
