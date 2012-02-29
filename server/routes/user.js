/*globals module */

// module dependencies
var User = require('../models').user.Model;

var userController = module.exports;

userController.addLogEntry = function(req, res) {
  var url = req.body.url;
  var timestamp = req.body.timestamp;

  var entryData = {
    url: url,
    timestamp: timestamp
  };
  req.user.addLogEntry(entryData, function(error) {
    if (!error) {
      res.json({
        success: true,
        isLoggedIn: true
      });
    }

    else {
      res.json({
        success: false,
        isLoggedIn: true
      });
    }
  });
};

userController.showProfile = function(req, res) {
  var userId = req.params.id || req.user.id;
  if (userId) {
    User.findById(userId, function(error, user) {
      if (!error) {
        res.render('profile.jade', {
          log: user.log
        });
      }

      else {

      }
    });
    
  }
   
};
