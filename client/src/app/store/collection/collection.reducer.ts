import { createReducer, on } from '@ngrx/store';
import { collectionState } from './collection.state';
import * as CollectionActions from './collection.actions';

export const collectionReducer = createReducer(
  collectionState,
  on(CollectionActions.loadSuccess, (state, { collections }) => ({
    ...state,
    collections,
    error: null,
  })),
  on(CollectionActions.loadFailure, (state, { error }) => ({
    ...state,
    error: error.error.message,
  })),
  on(CollectionActions.getCollectionSuccess, (state, { collection }) => ({
    ...state,
    collection,
    error: null,
  })),
  on(CollectionActions.getCollectionFailure, (state, { error }) => ({
    ...state,
    error: error.error.message,
  })),
  on(CollectionActions.addCollectionSuccess, (state, { collection }) => ({
    ...state,
    collections: [...state.collections, collection],
    error: null,
  })),
  on(CollectionActions.addCollectionFailure, (state, { error }) => ({
    ...state,
    error: error.error.message,
  })),
  on(
    CollectionActions.updateCollectionSuccess,
    (state, { id, collection }) => ({
      ...state,
      collections: state.collections.map(c => (c.id === id ? collection : c)),
      collection:
        collection.id === state.collection?.id ? collection : state.collection,
      error: null,
    })
  ),
  on(CollectionActions.updateCollectionFailure, (state, { error }) => ({
    ...state,
    error: error.error.message,
  })),
  on(CollectionActions.removeCollectionSuccess, (state, { id }) => ({
    ...state,
    collections: state.collections.filter(c => c.id !== id),
    error: null,
  })),
  on(CollectionActions.removeCollectionFailure, (state, { error }) => ({
    ...state,
    error: error.error.message,
  }))
);
