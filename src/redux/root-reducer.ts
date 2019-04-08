import { combineReducers } from 'redux';
import { routerReducer as router, RouterState } from 'react-router-redux';

import { RootAction } from 'Redux/root-action';
import { reducerProducts, StateProducts } from 'Redux/products/reducers';

export interface RootState {
  router: RouterState;
  products: StateProducts;
}

export const rootReducer = combineReducers<RootState, RootAction>({
  router,
  products: reducerProducts,
});
