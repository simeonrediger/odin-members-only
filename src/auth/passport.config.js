import passport from 'passport';

import localStrategy from './strategies/local.strategy.js';
import { serialize, deserialize } from './session.js';

export default function configurePassport() {
  passport.use(localStrategy);
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
}
