import { validationResult } from 'express-validator';

export function getErrorMessages(req) {
  const errors = validationResult(req).array();
  return errors.map(error => error.msg);
}
