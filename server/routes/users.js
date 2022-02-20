import express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import fs from 'fs';
import { Provider } from 'react-redux';
import buildStore from '../store/store';
import App from '../../client/app';

const router = express.Router();

const renderRequestPage = async (pageName) => {
  const pagePath = path.resolve(`public/${pageName}.html`);
  const requestPage = await fs.promises.readFile(pagePath, 'utf8');
  return requestPage;
};

const BuildAppComponentString = (store) => ReactDOMServer.renderToString(
  <Provider store={store}>
    <App />
  </Provider>,
);

/* GET home page. */
router.get('/', async (req, res) => {
  const requestPage = await renderRequestPage('index');
  const store = buildStore({ counter: { value: 10 } });
  const appString = BuildAppComponentString(store);
  const resData = requestPage
    .replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
    .replace('__PRELOADED_STATE_DATA', JSON.stringify(store.getState()));
  res.send(resData);
});

export default router;
