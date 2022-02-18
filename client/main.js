import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app';
import CreateStore from '../server/store/store';

ReactDOM.hydrate(
  // eslint-disable-next-line no-underscore-dangle
  <Provider store={CreateStore(window.__PRELOADED_STATE_)}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
