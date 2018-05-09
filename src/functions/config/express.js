import express from 'express';
import bodyParser from 'body-parser';
import requestIp from 'request-ip';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import routes from '../api/routes/v1';

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// retrieve a request's IP address
app.use(requestIp.mw());

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api v1 routes
app.use('/v1', routes);

export default app;
