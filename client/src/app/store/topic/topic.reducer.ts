import { createReducer, on } from '@ngrx/store';
import { topicState } from './topic.state';
import { addTopic, loadTopicsSuccess, removeTopic } from './topic.actions';

export const topicReducer = createReducer(
  topicState,
  on(loadTopicsSuccess, (state, { topics }) => ({
    ...state,
    topic: topics,
  })),
  on(addTopic, (state, { topic }) => ({
    ...state,
    topic: [...state.topic, topic],
  })),
  on(removeTopic, (state, { topic }) => ({
    ...state,
    topic: state.topic.filter(t => t !== topic),
  }))
);
