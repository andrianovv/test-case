import { getType } from 'typesafe-actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, debounceTime } from 'rxjs/operators';

import { AppEpic } from 'Redux/root-epic';
import * as a from 'Redux/products/actions';

export const fetchProductsFlow: AppEpic = (action$, _, { api }) =>
  action$.ofType(getType(a.fetchProductsRequest))
    .pipe(
      debounceTime(1000),
      switchMap((action: any) => api.get('products', '', action.payload).pipe(
        map((res: any) => res.body),
        map(a.fetchProductsSuccess),
        catchError((err: Error) => of(a.fetchProductsFailure(err))),
      )),
    );
