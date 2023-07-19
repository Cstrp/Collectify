import { AuthResponse } from '../../../modules/authentication/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState extends AuthResponse {
  error: HttpErrorResponse | null;
}
