/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './app';

const client = new ApolloClient({
  uri: `http://${BACKEND_URL}`,
  // eslint-disable-next-line no-underscore-dangle
  cache: new InMemoryCache().restore(window.__initialState__),
});

ReactDOM.hydrate(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
