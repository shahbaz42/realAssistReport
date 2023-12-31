import express, {Request, Response} from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { ErrorHandler } from './utils';
import dataRouter from './router/dataRouter';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(rateLimit({ // rate limit
    windowMs: 60 * 1000, // 1 minute
    max: 60, // 60 requests
}));
app.use(morgan('dev')); // logging
app.use(express.json()); 
app.use(cors()); // cors
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req: Request, res: Response) => { // for AWWS EB health check
    res.status(200).send('ok');
});
app.use('/data', dataRouter); // data router

app.use(ErrorHandler);
export default app;

