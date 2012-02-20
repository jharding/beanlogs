/*globals module */

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
