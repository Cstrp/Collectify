import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FileService } from '../../shared/services';
import { Injectable } from '@angular/core';
import {
  loadTopicsFailed,
  loadTopicsStart,
  loadTopicsSuccess,
} from './topic.actions';

@Injectable()
export class TopicEffects {
  constructor(
    private readonly fileService: FileService,
    private readonly actions$: Actions
  ) {}

  loadTopics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTopicsStart),
      mergeMap(() =>
        this.fileService.getFile().pipe(
          map(t => {
            const topics = t
              .split('\n')
              .filter(Boolean)
              .map(s => s.trim());
            return loadTopicsSuccess({ topics });
          }),
          catchError(error => of(loadTopicsFailed({ error })))
        )
      )
    );
  });
}
