import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as a from 'Redux/products/actions';
import * as products from 'Redux/products/reducers/products';

export type Action = ActionType<typeof a>;

export type StateProducts = {} & products.State;

export const getInitialStateProducts = (): StateProducts => ({
  ...products.getInitialState(),
});

export const reducerProducts = combineReducers<Readonly<StateProducts>, Action>({
  items: products.reducer,
});
