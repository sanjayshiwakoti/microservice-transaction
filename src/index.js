import './env';
import './db';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import routes from './routes';
import favicon from 'serve-favicon';
import logger from './utils/logger';
import bodyParser from 'body-parser';
import compression from 'compression';
import json from './middlewares/json';
import * as errorHandler from './middlewares/errorHandler';
import {validApiGateway} from './middlewares/serverValidator'

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);


app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;
let whitelist = '*';
const corsOptions = {
  origin: function(origin, callback) {
    let originIsWhitelisted;
    if (whitelist === '*') {
      originIsWhitelisted = true;
    } else {
      originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    }
    callback(originIsWhitelisted ? null : logger.error(locale.badRequest, origin), originIsWhitelisted);
  },
  methods: 'GET,PUT,POST,DELETE,PATCH',
  exposedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, X-Request-ID'
};

app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);
app.use(json);


// Everything in the public folder is served as static content
app.use(express.static(path.join(__dirname, '/../public')));

app.use(validApiGateway);
// API Routes
app.use('/api', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), () => {
  logger.log('info', `Server started at http://${app.get('host')}:${app.get('port')}`);
});

export default app;
