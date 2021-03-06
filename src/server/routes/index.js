import express from 'express';
import path from 'path';
import React from 'react';
import fs from 'fs';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import fetch from 'cross-fetch';
import App from '../../client/app';

const router = express.Router();

const renderRequestPage = async (pageName) => {
  const pagePath = path.resolve(`dist/public/${pageName}.html`);
  const requestPage = await fs.promises.readFile(pagePath, 'utf8');
  return requestPage;
};

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const requestPage = await renderRequestPage('index');

    const apolloClient = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        // eslint-disable-next-line no-undef
        uri: `http://${BACKEND_URL}:3000`,
        fetch,
      }),
      cache: new InMemoryCache(),
    });

    const serverApp = (
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    );
    const contentString = await renderToStringWithData(serverApp);
    const resData = requestPage
      .replace('<div id="root"></div>', `<div id="root">${contentString}</div>`)
      .replace('__initialData__', JSON.stringify(apolloClient.extract()));

    res.send(resData);
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

export default router;
