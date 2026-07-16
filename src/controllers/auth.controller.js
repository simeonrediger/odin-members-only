import { matchedData } from 'express-validator';
import bcrypt from 'bcryptjs';

import { getErrorMessages } from '../validators/validation-utils.js';
import db from '../db/queries.js';
import { USER_ROLES } from '../domains/constants.js';

export function getLogin(req, res) {
  res.render('login');
}

export function logOut(req, res, next) {
  req.logout(error => {
    if (error) {
      return next(error);
    }

    res.redirect('/');
  });
}

export function getSignup(req, res) {
  res.render('signup');
}

export async function registerUser(req, res, next) {
  const { username, displayName, password } = matchedData(req, {
    locations: ['body'],
  });
  const errors = getErrorMessages(req);

  if (errors.length > 0) {
    return res
      .status(400)
      .render('signup', { fields: { username, displayName }, errors });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.users.create({ username, displayName, passwordHash });

  req.login(user, error => {
    if (error) {
      return next(error);
    }

    res.redirect('/');
  });
}

export function getMemberForm(req, res) {
  res.render('member');
}

export async function registerMember(req, res) {
  const errors = getErrorMessages(req);

  if (errors.length > 0) {
    return res
      .status(400)
      .render('member', { fields: { answer: req.body.answer }, errors });
  }

  await db.users.updateRoleById(req.user.id, USER_ROLES.MEMBER);
  res.redirect('/');
}

export function getAdminForm(req, res) {
  res.render('admin');
}
