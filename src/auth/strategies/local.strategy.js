import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import db from '../../db/queries.js';

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const invalidCredentialsMessage = 'Incorrect username or password';
    const [user] = await db.users.findByUsername(username);

    if (!user) {
      return done(null, false, { message: invalidCredentialsMessage });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return done(null, false, { message: invalidCredentialsMessage });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default localStrategy;
