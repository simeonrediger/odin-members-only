import express from 'express';
import path from 'node:path';
import methodOverride from 'method-override';
import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
import passport from 'passport';

import pool from './db/pool.js';
import configurePassport from './auth/passport.config.js';
import assignLocals from './middleware/assign-locals.js';
import forumRouter from './routes/forum.router.js';
import authRouter from './routes/auth.router.js';
import * as errorController from './controllers/error.controller.js';

const app = express();

app.set('trust proxy', 1);
app.set('views', path.join(import.meta.dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(import.meta.dirname, '../public')));
app.use(express.urlencoded({ extended: false }));

const PgSessionStore = connectPgSimple(session);
app.use(
  session({
    store: new PgSessionStore({ pool, createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  }),
);

configurePassport();
app.use(passport.session());

app.use(assignLocals);
app.use((req, res, next) => {
  delete req.session.messages;
  next();
});

app.use('/', forumRouter);
app.use('/', authRouter);

app.use(errorController.handleNotFoundError);
app.use(errorController.handleServerError);

export default app;
