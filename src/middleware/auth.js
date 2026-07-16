import { USER_ROLES } from '../domains/constants.js';

export function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/log-in');
  }

  next();
}

export function ensureUserHasNoRole(req, res, next) {
  if (req.user.role) {
    return res.redirect('/');
  }

  next();
}

export function ensureUserIsMember(req, res, next) {
  if (req.user?.role !== USER_ROLES.MEMBER) {
    return res.redirect('/');
  }

  next();
}

export function ensureUserIsAdmin(req, res, next) {
  if (req.user?.role !== USER_ROLES.ADMIN) {
    return res.redirect('/');
  }

  next();
}
