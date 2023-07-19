import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../store';
import { loadStart, selectCollections } from '../../../../store/collection';
import { Observable } from 'rxjs';
import { Collection } from '../../interfaces';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
})
export class CollectionListComponent implements OnInit {
  collections$: Observable<Collection[]> = this.store.select(selectCollections);

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.#loadCollections();
  }

  #loadCollections() {
    this.store.dispatch(loadStart());
  }
}
