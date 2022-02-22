#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debugLib from 'debug';
import http from 'http';
import app from '../app';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

const debug = debugLib('ssr-react-v2:server');

const typeDefs = gql`
	type Book {
		title: String
		author: String
	}
	type Query {
		books: [Book]
	}
`;

const books = [
	{
		title: 'The Awakening',
		author: 'Kate chopin',
	},
	{
		title: 'City of glass',
		author: 'Paul Auster',
	},
	{
		title: 'City of Dust',
		author: 'Dave Auster',
	},
];

const resolvers = {
	Query: {
		books: () => books,
	},
};

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (Number.isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

async function startServer(typeDefs, resolvers) {
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	function onError(error) {
		if (error.syscall !== 'listen') {
			throw error;
		}

		const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case 'EACCES':
				// eslint-disable-next-line no-console
				console.error(`${bind} requires elevated privileges`);
				process.exit(1);
				break;
			case 'EADDRINUSE':
				// eslint-disable-next-line no-console
				console.error(`${bind} is already in use`);
				process.exit(1);
				break;
			default:
				throw error;
		}
	}
	function onListening() {
		const addr = server.address();
		const bind =
			typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
		debug(`Listening on ${bind}`);
	}
	await server.start();
	server.applyMiddleware({ app, path: '/graphql' });
	httpServer.on('error', onError);
	//httpServer.on('listening', onListening);
	await httpServer.listen(port);
}

startServer(typeDefs, resolvers).then(() => {
	console.info('appolo server started...');
});
