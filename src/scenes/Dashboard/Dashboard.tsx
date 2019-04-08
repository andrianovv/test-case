import * as React from 'react';
import autobind from 'autobind-decorator';

import { Subscription } from 'Scenes/Dashboard/components/Subscription/';
import { SceneProductsList } from 'Scenes/Dashboard/scenes/ProductsList';

import s from './styles.scss';

type Props = {};

type State = {
  activeSubscription: boolean;
};

export class Dashboard extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props);

    this.state = {
      activeSubscription: true,
    };
  }

  @autobind
  handleClick() {
    this.setState(prevState => ({
      activeSubscription: !prevState.activeSubscription,
    }));
  }

  render() {
    const { activeSubscription } = this.state;

    return (
      <div className={s.wrapper}>
        <Subscription
          active={activeSubscription}
          handleClick={this.handleClick}
        />
        <SceneProductsList
          active={!activeSubscription}
        />
      </div>
    );
  }
}
