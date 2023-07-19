import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionState } from './types';

const selectCollectionState =
  createFeatureSelector<CollectionState>('collection');

export const selectCollections = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.collections
);

export const selectCollection = createSelector(
  selectCollectionState,
  state => state.collection
);

export const selectError = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.error
);
