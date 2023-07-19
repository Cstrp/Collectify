import { Injectable } from '@angular/core';
import { CookieService as CookieServ } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  #expirationDate = new Date().getDate() + 1;
  #key = 'access_token';

  constructor(private readonly cookieService: CookieServ) {}

  public setAccessToken(value: string) {
    this.cookieService.set(this.#key, value, this.#expirationDate, '/');
  }

  public getAccessToken(): string {
    return this.cookieService.get(this.#key);
  }

  public rmAccessToken() {
    this.cookieService.delete(this.#key, '/');
  }
}
