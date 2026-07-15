import express from 'express';
import path from 'node:path';
import session from 'express-session';
import passport from 'passport';

import configurePassport from './auth/passport.config.js';
import assignLocals from './middleware/assign-locals.js';
import forumRouter from './routes/forum.router.js';
import authRouter from './routes/auth.router.js';

const app = express();

app.set('trust proxy', 1);
app.set('views', path.join(import.meta.dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(import.meta.dirname, '../public')));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
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

export default app;
