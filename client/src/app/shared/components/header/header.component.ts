import { Component } from '@angular/core';
import { AuthenticationService } from '../../../modules';
import { Store } from '@ngrx/store';
import { selectIsAuth, State } from '../../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public isAuthenticated: Observable<boolean> = this.store.select(selectIsAuth);
  constructor(
    private readonly authService: AuthenticationService,
    private readonly store: Store<State>
  ) {}
}
