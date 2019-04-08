import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Router } from 'react-router-dom';
import { History } from 'history';
import { Routes } from './routes';

interface Props {
  store: Store<any>;
  history: History;
}

export const AppPage: React.SFC<Props> = ({ store, history }) => (
  <Provider store={store}>
    <>
      <Router history={history}>
        <Routes/>
      </Router>
    </>
  </Provider>
);
