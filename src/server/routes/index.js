import express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import fs from 'fs';
import App from '../../client/app';

const router = express.Router();

const renderRequestPage = async (pageName) => {
	const pagePath = path.resolve(`dist/public/${pageName}.html`);
	const requestPage = await fs.promises.readFile(pagePath, 'utf8');
	return requestPage;
};

const BuildAppComponentString = () => ReactDOMServer.renderToString(<App />);

/* GET home page. */
router.get('/', async (req, res) => {
	try {
		const requestPage = await renderRequestPage('index');
		const appString = BuildAppComponentString();
		const resData = requestPage.replace(
			'<div id="root"></div>',
			`<div id="root">${appString}</div>`
		);
		res.send(resData);
	} catch (e) {
		res.send(e);
	}
});

export default router;
