import { AppEpic } from 'Redux/root-epic';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { EpicMiddlewareDependencies } from 'Types/epicMiddlewareDependencies';
import { concatMap } from 'rxjs/operators';

/* here could be added logic for global handlers, for e.g. global authorization error handler */
export const epicWithGlobalHandler = (epic: AppEpic) =>
  (action$: ActionsObservable<any>, state: any, deps: EpicMiddlewareDependencies) =>
    epic(action$, state, deps)
      .pipe(
        concatMap((action: any) => of(action)),
      );
