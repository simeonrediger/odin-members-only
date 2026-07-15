import * as domainConstants from '../domains/constants.js';

export default function assignLocals(req, res, next) {
  Object.assign(res.locals, domainConstants);
  res.locals.currentUser = req.user;
  res.locals.messages = req.session.messages;
  next();
}
