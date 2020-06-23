import "reflect-metadata";
import cors from 'cors';
import express from 'express';
import { createConnection } from "typeorm";

const app = express();

const connection = createConnection();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello world!');
})

app.listen(3333);
