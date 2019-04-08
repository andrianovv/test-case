import * as React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Dashboard } from 'Scenes/Dashboard/Dashboard';

export class Routes extends React.Component<{}, {}> {
  static root = '/';
  static items = '/products';

  render() {
    return (
      <Switch>
        <Route
          exact={true}
          path={Routes.root}
          render={props => <Dashboard {...props}/>}
        />
        <Route
          render={() => <Redirect to={Routes.root} />}
        />
      </Switch>
    );
  }
}
