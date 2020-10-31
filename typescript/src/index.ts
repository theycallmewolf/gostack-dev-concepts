import express from 'express';
import { helloWolf } from './routes';

const app = express();

app.get('/', helloWolf);

app.listen(3333);