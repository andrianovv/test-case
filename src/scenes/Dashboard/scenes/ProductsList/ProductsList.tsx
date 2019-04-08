import * as React from 'react';
import autobind from 'autobind-decorator';
import { head } from 'ramda';

import { Product, RatePlan } from 'Types/domain/Product';

import { Tile } from 'Scenes/Dashboard/components/Tile';

import s from './styles.scss';

// tslint:disable-next-line:no-var-requires
const mockProducts = require('../../../../../mockServer/db.json').products;

type OwnProps = {
  active: boolean;
};

export type DataProps = {
  products?: Product[],
};

export type ActionProps = {
  fetchProducts: () => void;
  clearProductsList: () => void;
};

type Props = OwnProps & DataProps & ActionProps;

type State = {
  tiles: string[],
  products: Product[],
  ratePlans: RatePlan[],
};

export class ProductsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tiles: ['1'],
      products: [],
      ratePlans: [],
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.saveProducts();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.products && prevProps.products !== this.props.products) {
      this.setState({
        products: this.props.products,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearProductsList();
  }

  @autobind
  saveProducts() {
    this.setState((_, props) => ({
      products: props.products!.length
        ? props.products
        : mockProducts,
    }));
  }

  @autobind
  handleChangeProduct(label: string) {
    const { products } = this.state;
    const product = head(products.filter((item: Product) => item.name === label));
    const ratePlans =  product!.ratePlans;

    this.setState({
      ratePlans,
      // products: reject(equals(product), products)
    });
  }

  @autobind
  addNewTile() {
    const tiles = [...this.state.tiles];
    tiles.push(`${this.state.tiles.length + 1}`);

    this.setState({
      tiles,
    });
  }

  render() {
    const { active } = this.props;
    const { tiles, products, ratePlans } = this.state;
    const productLabels = products.map((item: Product) => item.name);

    return (
      <div
        className={active ? s.content : s.hidden}
      >
        <div className={s.list}>
          {tiles.map((i: string) => (
            <Tile
              key={i}
              id={i}
              productLabels={productLabels}
              ratePlans={ratePlans}
              handleChangeProduct={this.handleChangeProduct}
            />
          ))}
        </div>
        <footer>
          <span
            className={s.additing}
            onClick={this.addNewTile}
          >
            Add another product
          </span>
          <span>Total</span>
        </footer>
      </div>
    );
  }
}
