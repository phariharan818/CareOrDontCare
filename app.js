import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connectDB, Topic } from './models.js';

import indexRouter from './routes/homepage.js';
import careRouter from './routes/care.js';
import dontcareRouter from './routes/dontcare.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/care', careRouter);
app.use('/dontcare', dontcareRouter);

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})

export default app;
