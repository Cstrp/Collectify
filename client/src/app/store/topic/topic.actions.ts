import { createAction, props } from '@ngrx/store';
import { TOPIC_ACTIONS } from './types';

export const loadTopicsStart = createAction(TOPIC_ACTIONS.LOAD);
export const loadTopicsSuccess = createAction(
  TOPIC_ACTIONS.LOAD_SUCCESS,
  props<{ topics: string[] }>()
);
export const loadTopicsFailed = createAction(
  TOPIC_ACTIONS.LOAD_FAILURE,
  props<{ error: string }>()
);

export const addTopic = createAction(
  TOPIC_ACTIONS.ADD_TOPIC,
  props<{ topic: string }>()
);
export const removeTopic = createAction(
  TOPIC_ACTIONS.REMOVE_TOPIC,
  props<{ topic: string }>()
);
