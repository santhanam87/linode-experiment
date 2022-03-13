import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './app';
console.info('*****',BACKEND_URL);
const client = new ApolloClient({
	uri: `http://${BACKEND_URL}`,
	cache: new InMemoryCache().restore(window.__initialState__),
});

ReactDOM.hydrate(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
