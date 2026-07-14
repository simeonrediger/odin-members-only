import { matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import db from '../db/queries.js';

export function getSignup(req, res) {
  res.render('signup');
}

export async function registerUser(req, res) {
  const { username, password } = matchedData(req, { locations: ['body'] });
  const errors = getErrorMessages(req);

  if (errors.length > 0) {
    return res.status(400).render('signup', { fields: { username }, errors });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.users.create({ username, passwordHash });
  res.redirect('/');
}

function getErrorMessages(req) {
  const errors = validationResult(req).array();
  const messages = errors.map(error => error.msg);
  return messages;
}
