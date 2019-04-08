import { createStandardAction, createAsyncAction } from 'typesafe-actions';

import { Product } from 'Types/domain/Product';

export const {
  request: fetchProductsRequest,
  success: fetchProductsSuccess,
  failure: fetchProductsFailure,
} = createAsyncAction(
  'FETCH_PRODUCTS_REQUEST',
  'FETCH_PRODUCTS_SUCCESS',
  'FETCH_PRODUCTS_FAILURE',
)<any, Product[], Error>();

export const clearProductsList = createStandardAction('CLEAR_PRODUCTS_LIST')();
