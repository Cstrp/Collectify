import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Collection } from '../../interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  getCollection,
  removeCollection,
  selectCollection,
} from '../../../../store/collection';
import { MatDialog } from '@angular/material/dialog';
import { DialogCollectionFormComponent } from '../../../../shared';
import { DialogCollectionItemFormComponent } from '../../../../shared/components/dialog-collection-item-form/dialog-collection-item-form.component';
import { selectCurrentRoute } from '../../../../store';

@Component({
  selector: 'app-detailed-collection',
  templateUrl: './detailed-collection.component.html',
})
export class DetailedCollectionComponent implements OnInit, OnDestroy {
  public collection!: Collection;
  public currLoc!: string;

  #detailedSub!: Subscription;
  private routeState = this.store.select(selectCurrentRoute);

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly route: Router,
    private readonly router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCollection();

    this.routeState.subscribe((state) => {
      this.currLoc = state.url.split('/')[3];
    });
  }

  ngOnDestroy(): void {
    if (this.#detailedSub) {
      this.#detailedSub.unsubscribe();
    }
  }

  public openCollectionDialog() {
    this.dialog.open(DialogCollectionFormComponent, {
      data: this.collection,
      width: '100%',
    });
  }

  public openItemDialog() {
    this.dialog.open(DialogCollectionItemFormComponent, {
      data: this.collection.items,
      width: '100%',
    });
  }

  public deleteCollection() {
    const id = this.collection.id;

    if (id) {
      this.store.dispatch(removeCollection({ id }));
      this.route.navigate(['/overview']);
    }
  }

  public capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private loadCollection() {
    this.#detailedSub = this.router.params
      .pipe(
        switchMap((params: Params) => {
          const id = params['id'];
          this.store.dispatch(getCollection({ id }));
          return this.store.select(selectCollection);
        })
      )
      .subscribe((c) => (this.collection = c!));
  }
}
