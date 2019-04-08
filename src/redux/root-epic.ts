import { combineEpics, Epic } from 'redux-observable';

import { EpicMiddlewareDependencies } from 'Types/epicMiddlewareDependencies';

import { RootAction } from 'Redux/root-action';
import * as epicProducts from 'Redux/products/epics';
import { epicWithGlobalHandler } from 'Redux/utils/epic-wrappers';

export type AppEpic = Epic<RootAction, any, EpicMiddlewareDependencies>;

const epics = [
  epicProducts.fetchProductsFlow,
].map(epicWithGlobalHandler);

export const rootEpic = combineEpics(
  ...epics,
);
