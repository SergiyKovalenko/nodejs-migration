function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/v1/auth/');
}

function isNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/v1/users/');
  }
  return next();
}

module.exports = {
  isAuth,
  isNotAuth,
};
