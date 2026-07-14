import { validationResult } from 'express-validator';

export function getSignup(req, res) {
  res.render('signup');
}

export function registerUser(req, res) {
  const errors = getErrorMessages(req);

  if (errors.length > 0) {
    res.status(400).render('signup', { errors });
  }
}

function getErrorMessages(req) {
  const errors = validationResult(req).array();
  const messages = errors.map(error => error.msg);
  return messages;
}
