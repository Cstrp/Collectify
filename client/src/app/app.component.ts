import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setTokenSuccess } from './store';
import { CookieService } from './shared/services';

@Component({
  selector: 'app-root',
  template: `<div
    class="relative min-h-screen w-full flex items-center justify-center"
  >
    <app-particles />
    <div class="fixed w-full top-0">
      <app-header />
    </div>
    <div class="container mx-auto">
      <div class="w-full">
        <router-outlet />
      </div>
    </div>
  </div>`,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly cookieService: CookieService
  ) {}
  ngOnInit(): void {
    const access_token = this.cookieService.getAccessToken();

    if (access_token) this.store.dispatch(setTokenSuccess({ access_token }));
  }
}
