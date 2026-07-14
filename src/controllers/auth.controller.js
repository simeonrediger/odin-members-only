import { matchedData, validationResult } from 'express-validator';

export function getSignup(req, res) {
  res.render('signup');
}

export function registerUser(req, res) {
  const validFields = matchedData(req, { locations: ['body'] });
  const errors = getErrorMessages(req);

  if (errors.length > 0) {
    const { username } = validFields;
    const fields = { username };
    res.status(400).render('signup', { fields, errors });
  }
}

function getErrorMessages(req) {
  const errors = validationResult(req).array();
  const messages = errors.map(error => error.msg);
  return messages;
}
