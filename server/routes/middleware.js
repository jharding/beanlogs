var middleware = module.exports;

middleware.verifyUser = function(req, res, next) {
  if (req.loggedIn) {
    next();
  }

  else {
    next(new Error('No credentials'));
  }
};
