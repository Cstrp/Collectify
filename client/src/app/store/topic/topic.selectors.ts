import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TopicState } from './types';

export const selectTopicState = createFeatureSelector<TopicState>('topic');

export const selectTopic = createSelector(
  selectTopicState,
  state => state.topic
);

export const selectError = createSelector(
  selectTopicState,
  state => state.error
);
