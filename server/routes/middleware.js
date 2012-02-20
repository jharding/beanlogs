var middleware = module.exports;

middleware.verifyUser = function(req, res, next) {
  if (req.loggedIn) {
    next();
  }

  else {
    res.json({
      success: false,
      isLoggedIn: false
    });
  }
};
