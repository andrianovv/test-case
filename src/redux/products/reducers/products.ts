import { getType, ActionType } from 'typesafe-actions';

import { DataState } from 'Types/dataState';
import { Product } from 'Types/domain/Product';

import * as a from 'Redux/products/actions';

type Action = ActionType<typeof a>;

export class State {
  items: DataState<Product[]>;
}

export const getInitialState = (): State => ({
  items: DataState.initial(),
});

export const reducer = (state = getInitialState().items, action: Action): typeof state => {
  switch (action.type) {
    case getType(a.fetchProductsRequest):
      return {
        ...state,
        loading: true,
        error: null,
      };
    case getType(a.fetchProductsSuccess):
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case getType(a.fetchProductsFailure):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case getType(a.clearProductsList):
      return {
        ...getInitialState().items,
      };

    default:
      return state;
  }
};
