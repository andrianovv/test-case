import { fromEvent, Observable } from 'rxjs';
import { map, startWith, share } from 'rxjs/operators';
import { getScreenWidth } from 'Redux/utils/window-utils';

export const trackScreenWidth: Observable<any> = fromEvent(window, 'resize')
  .pipe(
    map(getScreenWidth),
    startWith(getScreenWidth()),
    share(),
  );
