import express from 'express';
import path from 'node:path';

import forumRouter from './routes/forum.router.js';
import authRouter from './routes/auth.router.js';

const app = express();

app.set('views', path.join(import.meta.dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(import.meta.dirname, '../public')));

app.use('/', forumRouter);
app.use('/', authRouter);

export default app;
