import { createAction, props } from '@ngrx/store';
import { COLLECTION_ACTIONS } from './types/collection-actions.enum';
import { Collection } from '../../modules';
import { HttpErrorResponse } from '@angular/common/http';

export const loadStart = createAction(COLLECTION_ACTIONS.LOAD_COLLECTIONS);
export const loadSuccess = createAction(
  COLLECTION_ACTIONS.LOAD_COLLECTIONS_SUCCESS,
  props<{ collections: Collection[] }>()
);
export const loadFailure = createAction(
  COLLECTION_ACTIONS.LOAD_COLLECTIONS_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

export const getCollection = createAction(
  COLLECTION_ACTIONS.GET_COLLECTION,
  props<{ id: string }>()
);
export const getCollectionSuccess = createAction(
  COLLECTION_ACTIONS.GET_COLLECTION_SUCCESS,
  props<{ collection: Collection }>()
);
export const getCollectionFailure = createAction(
  COLLECTION_ACTIONS.GET_COLLECTION_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

export const addCollection = createAction(
  COLLECTION_ACTIONS.ADD_COLLECTION,
  props<{ collection: Collection }>()
);

export const addCollectionSuccess = createAction(
  COLLECTION_ACTIONS.ADD_COLLECTION_SUCCESS,
  props<{ collection: Collection }>()
);

export const addCollectionFailure = createAction(
  COLLECTION_ACTIONS.ADD_COLLECTION_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

export const updateCollection = createAction(
  COLLECTION_ACTIONS.UPDATE_COLLECTION,
  props<{ id: string; collection: Collection }>()
);

export const updateCollectionSuccess = createAction(
  COLLECTION_ACTIONS.UPDATE_COLLECTION_SUCCESS,
  props<{ id: string; collection: Collection }>() // Добавлен параметр id
);

export const updateCollectionFailure = createAction(
  COLLECTION_ACTIONS.UPDATE_COLLECTION_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

export const removeCollection = createAction(
  COLLECTION_ACTIONS.REMOVE_COLLECTION,
  props<{ id: string }>()
);

export const removeCollectionSuccess = createAction(
  COLLECTION_ACTIONS.REMOVE_COLLECTION_SUCCESS,
  props<{ id: string }>()
);

export const removeCollectionFailure = createAction(
  COLLECTION_ACTIONS.REMOVE_COLLECTION_FAILURE,
  props<{ error: HttpErrorResponse }>()
);
