import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome');
});
app.get('/api', (req, res) => {
  res.send('welcome2');
});

// application routes
app.use('/api', router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
