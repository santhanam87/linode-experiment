import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './app';

const client = new ApolloClient({
	uri: 'http://backend-server:3000', // TODO: yet to figure out how to connect with nodemon
	cache: new InMemoryCache().restore(window.__initialState__),
});

ReactDOM.hydrate(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
