import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { CollectionState } from '../collection/types';
import { AuthState } from '../authentication/types';
import { collectionReducer } from '../collection';
import { authReducer } from '../authentication';
import { TopicState } from '../topic/types';
import { isDevMode } from '@angular/core';
import { topicReducer } from '../topic';

export interface State {
  router: RouterReducerState;
  auth: AuthState;
  topic: TopicState;
  collection: CollectionState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  auth: authReducer,
  topic: topicReducer,
  collection: collectionReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
