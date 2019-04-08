import * as React from 'react';
import { head } from 'ramda';
import autobind from 'autobind-decorator';

import { Id } from 'Types/Id';
import { RatePlan } from 'Types/domain/Product';

import s from './styles.scss';

type Props = {
  id: Id;
  productLabels: string[];
  ratePlans: RatePlan[];
  handleChangeProduct: (value: string) => void;
};

type State = {
  selectedProduct: string;
  selectedRatePlan: string;
  amount: string;
  price: number;
  total: number;
};

export class Tile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedProduct: '',
      selectedRatePlan: '',
      amount: '0',
      price: 0,
      total: 0,
    };
  }

  @autobind
  handleChangeProduct(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;

    this.setState({
      selectedProduct: value,
      amount: '0',
      price: 0,
      total: 0,
    });
    this.props.handleChangeProduct(value);
  }

  @autobind
  handleChangeRatePlan(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    const { ratePlans } = this.props;
    const ratePlan = head(ratePlans.filter((item: RatePlan) => item.name === value));
    const price = ratePlan!.price;

    this.setState({
      price,
      total: price,
      amount: '1',
      selectedRatePlan: value,
    });
  }

  @autobind
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const amount = +value;

    if (!!(amount)) {
      this.setState(prevState => ({
        total: prevState.price * amount,
      }));
    } else {
      this.setState({
        total: 0,
      });
    }

    this.setState({
      amount: value,
    });
  }

  @autobind
  handleBlur(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    if (!value) {
      this.setState({
        amount: '0',
      });
    }
  }

  render() {
    const { productLabels, ratePlans } = this.props;
    const { selectedProduct, selectedRatePlan, amount, total } = this.state;
    const ratePlanLabels = ratePlans.map((item: RatePlan) => item.name);

    return (
      <div className={s.tile}>
        <p>
          <label htmlFor="product">Product: </label>
          <select
            id="product"
            value={selectedProduct}
            onChange={this.handleChangeProduct}
          >
            <>
              <option
                selected={true}
                hidden={true}
              >
                Select a product
              </option>
              {productLabels.map((item: string, index: number) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </>
          </select>
        </p>
        <p>
          <label htmlFor="ratePlan">Rate plan: </label>
          <select
            id="ratePlan"
            value={selectedRatePlan}
            onChange={this.handleChangeRatePlan}
          >
            <>
              <option
                selected={true}
                hidden={true}
              >
                Select a rate plan
              </option>
              {ratePlanLabels.map((item: any, index: number) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </>
          </select>
        </p>
        <p>
          <label htmlFor="amount">No. of seats</label>
          <input
            type="number"
            id="amount"
            min="0"
            value={amount}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </p>
        <p>
          Product total: {total}.00
        </p>
      </div>
    );
  }
}
