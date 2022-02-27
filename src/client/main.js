import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './app';

const client = new ApolloClient({
	uri: 'http://23.239.26.178:3000',
	cache: new InMemoryCache(),
});

ReactDOM.hydrate(
	// eslint-disable-next-line no-underscore-dangle
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
