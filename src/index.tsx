import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppPage } from './app';
import { store, browserHistory, epicMiddleware } from './store';

import './assets/styles/global.scss';

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById('root'));
};

if (process.env.NODE_ENV === 'production') {
  renderRoot((
    <AppPage store={store} history={browserHistory} />
  ));
} else { // removed in production, hot-reload config
  // tslint:disable-next-line:no-var-requires
  const AppContainer = require('react-hot-loader').AppContainer;
  renderRoot((
    <AppContainer>
      <AppPage store={store} history={browserHistory} />
    </AppContainer>
  ));

  if (module.hot) {
    // app
    module.hot.accept('./app', async () => {
      const NextApp = require('./app').App;

      renderRoot((
        <AppContainer>
          <NextApp store={store} history={browserHistory} />
        </AppContainer>
      ));
    });

    // reducers
    module.hot.accept('./redux/root-reducer', () => {
      const newRootReducer = require('./redux/root-reducer').default;
      store.replaceReducer(newRootReducer);
    });

    // epics
    module.hot.accept('./redux/root-epic', () => {
      const newRootEpic = require('./redux/root-epic').default;
      epicMiddleware.run(newRootEpic);
    });
  }
}
