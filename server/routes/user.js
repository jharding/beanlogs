/*globals module */

// module dependencies
var User = require('../models').user.Model;
var LogEntry = require('../models').logEntry.Model;

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
  // userId defaults to logged in user
  var userId = req.params.id || req.user.id;
  LogEntry.findMostRecentByUser(userId, 10, function(error, results) {
    if (!error) {
      res.render('profile.jade', {
        log: results
      });
    }
  });
};
