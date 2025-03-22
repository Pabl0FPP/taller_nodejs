import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { userRouter, authRouter} from './routes';
import { db } from "./lib/connectionDB";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/auth', authRouter);


export { app, db };