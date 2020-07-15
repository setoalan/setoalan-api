import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import favicon from 'serve-favicon';
import { notFound, developmentErrors, productionErrors } from './handlers/errors';

import index from './routes/index';

dotenv.config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use(notFound);

if (app.get('env') === 'development') {
  app.use(developmentErrors);
}

app.use(productionErrors);

export default app;
