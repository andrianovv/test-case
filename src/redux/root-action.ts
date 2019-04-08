// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { getReturnOfExpression } from 'utility-types';

import * as actionProducts from 'Redux/products/actions';

export const actions = {
  products: actionProducts,
};

export const returnsOfActions = [
  ...Object.values(actionProducts),
].map(getReturnOfExpression);

type AppAction = typeof returnsOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
