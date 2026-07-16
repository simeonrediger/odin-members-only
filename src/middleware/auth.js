export function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/log-in');
  }

  next();
}

export function ensureNoRole(req, res, next) {
  if (req.user.role) {
    return res.redirect('/');
  }

  next();
}
