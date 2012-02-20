var userController = module.exports;

userController.addLogEntry = function(req, res) {
  var url = req.body.url;
  var timestamp = req.body.timestamp;

  var entryData = {
    url: url,
    timestamp: timestamp
  };
  req.user.addLogEntry(entryData);
  res.send();
};
