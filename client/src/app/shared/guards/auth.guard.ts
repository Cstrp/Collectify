import { AuthenticationService, Collection, User } from '../../modules';
import { Injectable } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { SnackBarService } from '../services';
import { selectUser } from '../../store';
import { selectCollections } from '../../store/collection';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private selectedUserId: Observable<User> = this.store.select(selectUser);
  private selectedCollection: Observable<Collection[]> =
    this.store.select(selectCollections);

  private userId = '';
  private collectionUserId = '';

  constructor(
    private readonly authService: AuthenticationService,
    private readonly snackBarService: SnackBarService,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkState();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(childRoute, state);
  }

  private checkState(): Observable<boolean> {
    this.setIds();
    const isAuth = this.authService.isAuth();

    if (isAuth) {
      if (this.userId !== this.collectionUserId) {
        this.snackBarService.open('You are not authorized to access this page');
        this.router.navigate(['/overview']);
        return of(false);
      }

      return of(true);
    } else {
      this.router.navigate(['/sign-in']);
      return of(false);
    }
  }

  private setIds() {
    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe(usr => {
        if (usr && usr.id) {
          this.userId = usr.id;
        }
      });

    this.store
      .select(selectCollections)
      .pipe(take(1))
      .subscribe(collections => {
        collections.forEach(collection => {
          if (collection && collection.userId) {
            this.collectionUserId = collection.userId;
          }
        });
      });
  }
}
