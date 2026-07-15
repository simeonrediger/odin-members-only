import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_DISPLAY_NAME_LENGTH,
  MAX_DISPLAY_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../domains/constants.js';

export default function assignLocals(req, res, next) {
  Object.assign(res.locals, locals);
  next();
}

const locals = {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_DISPLAY_NAME_LENGTH,
  MAX_DISPLAY_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
};
