import { AuthenticationService } from '../../../authentication';
import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../../services';
import { Location } from '@angular/common';
import { State } from '../../../../store';
import { Store } from '@ngrx/store';
import { CookieService } from '../../../../shared/services';
import { Collection, CollectionService } from '../../../collection';
import { Observable } from 'rxjs';
import { selectCollections } from '../../../../store/collection';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  public collections: Observable<Collection[]> =
    this.store.select(selectCollections);

  constructor(
    private readonly authService: AuthenticationService,
    private readonly overviewService: OverviewService,
    private readonly collectionService: CollectionService,
    private readonly cookieService: CookieService,
    private readonly store: Store<State>,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.overviewService.getUserData();
    const access_token = this.cookieService.getAccessToken();

    if (access_token) {
      this.authService.setToken(access_token);
    }

    this.location.replaceState('/overview');
  }
}
