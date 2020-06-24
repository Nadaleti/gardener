import "reflect-metadata";
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { createConnection } from "typeorm";

import APIError from "./errors/APIError";

const app = express();

const connection = createConnection();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello world!');
})

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
