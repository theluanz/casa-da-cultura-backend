import express, { Handler, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './shared/infra/routes/index.routes';
import { errorMiddleware } from '@shared/middleares/errorMiddleware';

const app = express();
app.use(express.json());

app.use(router);

app.use(errorMiddleware);

app.listen(3000, () => console.log('Server is running!!!'));
