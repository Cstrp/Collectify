import { Injectable } from '@angular/core';
import { CollectionService } from '../../modules';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CollectionActions from './collection.actions';
import { getCollection } from './collection.actions';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CollectionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly collectionService: CollectionService
  ) {}

  loadCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionActions.loadStart),
      mergeMap(() => {
        return this.collectionService.getCollections().pipe(
          map(collections => CollectionActions.loadSuccess({ collections })),
          catchError(error => of(CollectionActions.loadFailure({ error })))
        );
      })
    );
  });

  getCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCollection),
      mergeMap(({ id }) => {
        return this.collectionService.getCollection(id).pipe(
          map(collection =>
            CollectionActions.getCollectionSuccess({ collection })
          ),
          catchError(error =>
            of(CollectionActions.getCollectionFailure({ error }))
          )
        );
      })
    );
  });

  addCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionActions.addCollection),
      concatMap(({ collection }) => {
        return this.collectionService.createCollection(collection).pipe(
          concatMap(col =>
            of(CollectionActions.addCollectionSuccess({ collection: col }))
          ),
          catchError(error =>
            of(CollectionActions.addCollectionFailure({ error }))
          )
        );
      })
    );
  });

  updateCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionActions.updateCollection),
      mergeMap(({ id, collection }) => {
        return this.collectionService.updateCollection(id, collection).pipe(
          mergeMap(() =>
            this.collectionService.getCollection(id).pipe(
              map(updatedCollection =>
                CollectionActions.updateCollectionSuccess({
                  id: updatedCollection.id!,
                  collection: updatedCollection,
                })
              ),
              catchError(error =>
                of(CollectionActions.updateCollectionFailure({ error }))
              )
            )
          )
        );
      })
    );
  });

  removeCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionActions.removeCollection),
      mergeMap(({ id }) =>
        this.collectionService.removeCollection(id).pipe(
          map(() => CollectionActions.removeCollectionSuccess({ id })),
          catchError(error =>
            of(CollectionActions.removeCollectionFailure({ error }))
          )
        )
      )
    );
  });
}
