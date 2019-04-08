import { connect } from 'react-redux';

import { RootState } from 'Redux/root-reducer';
import {
  ProductsList,
  DataProps,
  ActionProps,
} from 'Scenes/Dashboard/scenes/ProductsList';
import * as a from 'Redux/products/actions';

const mapStateToProps = (state: RootState): DataProps => ({
  products: state.products.items.data || [],
});

const mapDispatchToProps: ActionProps = {
  fetchProducts: a.fetchProductsRequest,
  clearProductsList: a.clearProductsList,
};

export const SceneProductsList = connect<DataProps, ActionProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsList);
