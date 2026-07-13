import express from 'express';
import path from 'node:path';

import forumRouter from './routes/forum.router.js';

const app = express();

app.set('views', path.join(import.meta.dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use('/', forumRouter);

export default app;
