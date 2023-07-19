import { Component, OnDestroy, OnInit } from '@angular/core';
import { getProfile, logout, selectUser } from '../../../store';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../modules';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit, OnDestroy {
  public user!: User;

  private menuSub: Subscription = new Subscription();
  private user$: Observable<User> = this.store.select(selectUser);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getProfile());
    this.menuSub = this.user$.subscribe(u => (this.user = u));
  }

  ngOnDestroy(): void {
    this.menuSub.unsubscribe();
  }

  public logout() {
    this.store.dispatch(logout());
  }

  public getGreeting(): string {
    const currData = new Date();
    const hours = currData.getHours();

    if (hours >= 5 && hours < 12) {
      return `Good Morning ${this.getUserName()}`;
    } else if (hours >= 12 && hours < 18) {
      return `Good Afternoon ${this.getUserName()}`;
    } else {
      return `Good Evening ${this.getUserName()}`;
    }
  }

  private getUserName(): string {
    return this.user.username ? this.capitalize(this.user.username) : '';
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
