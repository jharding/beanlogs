/*globals module */

// module dependencies
var User = require('../models').user.Model;
var LogEntry = require('../models').logEntry.Model;

var userController = module.exports;

var TIME = {
  MS_IN_DAY: 86400000,
  MS_IN_WEEK: 604800000
};

userController.addLogEntry = function(req, res) {
  var url = req.body.url;
  var host = req.body.host;
  var timestamp = req.body.timestamp;

  var entryData = {
    url: url,
    host: host,
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

userController.showMostRecent = function(req, res) {
  var userId = req.params.id || req.user.id;
  LogEntry.getMostRecentByUserByMax(userId, 10, function(error, results) {
    if (!error) {
      res.render('profile.jade', {
        log: results
      });
    }
  });
};

userController.showLastWeek = function(req, res) {
  var userId = req.params.id || req.user.id;
  var time = {
    start: (new Date()).getTime() - TIME.MS_IN_WEEK
  };
  LogEntry.getByUserAndTime(userId, time, function(error, results) {
    if (!error) {
      res.render('profile.jade', {
        log: results
      });
    }
  });
};
