/*globals module */

// module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LogEntrySchema = new Schema({
  owner: ObjectId, 
  url: String,
  timestamp: Number
});

LogEntrySchema.statics
.findMostRecentByUser = function(userId, max, callback) {
  this.where('owner').equals(userId)
      .desc('timestamp')
      .limit(max)
      .run(callback);
};

// creating the model
var LogEntry = mongoose.model('LogEntry', LogEntrySchema);

// exposing exports
module.exports.Model = LogEntry;
module.exports.Schema = LogEntrySchema;
