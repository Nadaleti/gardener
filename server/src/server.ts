import 'reflect-metadata';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';

import authRouter from './routes/auth';
import userRouter from './routes/user';

import APIError from './errors/APIError';
import { verifyToken } from './middlewares/authorization';

const app = express();
const connection = createConnection();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', verifyToken, userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new APIError('Not found', 404);

  next(error);
});

app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message || 'Internal Server Error',
  })
});

app.listen(3333);
