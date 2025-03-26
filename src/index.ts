import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { userRouter, authRouter, containerRouter, fraganceRouter, candleRouter} from './routes';
import { db } from "./lib/connectionDB";
import { createRoles } from './lib/initialSetup';

dotenv.config();

const app: Express = express();
const port: number = process.env.PORT as any || 3000;
createRoles();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/container', containerRouter);
app.use('/fragance', fraganceRouter);
app.use('/candle', candleRouter);


db.then( () =>
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    } )
);


export default app;