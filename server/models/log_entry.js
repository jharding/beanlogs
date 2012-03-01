/*globals module */

// module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LogEntrySchema = new Schema({
  owner: ObjectId, 
  url: String,
  host: String,
  timestamp: Number
});

LogEntrySchema.statics
.getMostRecentByUser = function(userId, max, callback) {
  this.where('owner').equals(userId)
      .desc('timestamp')
      .limit(max)
      .run(callback);
};

LogEntrySchema.statics
.getByUserAndTime = function(userId, time, callback) {
  var startTime = time.start || 0;
  var endTime = time.end || (new Date()).getTime();

  this.where('owner').equals(userId)
      .where('timestamp').gte(startTime)
      .where('timestamp').lte(endTime)
      .desc('timestamp')
      .run(callback);
};

LogEntrySchema.statics
.getByUserAndHost = function(userId, host, callback) {
  this.where('owner').equals(userId)
      .where('host').equals(host)
      .desc('timestamp')
      .run(callback);
};

// creating the model
var LogEntry = mongoose.model('LogEntry', LogEntrySchema);

// exposing exports
module.exports.Model = LogEntry;
module.exports.Schema = LogEntrySchema;
