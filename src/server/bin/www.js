import debugLib from 'debug';
import http from 'http';
import app from '../app';
const debug = debugLib('ssr-react-v2:server');

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

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

async function startServer() {
	const httpServer = http.createServer(app);
	//httpServer.on('listening', onListening);
	await httpServer.listen(port);
}

startServer().then(() => {
	console.info('appolo server started...');
});
