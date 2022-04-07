import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dust from 'express-dustjs';

import indexRouter from './routes/index';
import dustRouter from './routes/dust';

const app = express();
app.engine('dust', dust.engine());
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, './views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/dust', dustRouter);
app.use(express.static(path.join(__dirname, './public')));

export default app;
