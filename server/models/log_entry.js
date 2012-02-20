/*globals module */

// module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogEntrySchema = new Schema({
  url: String,
  timestamp: Number
});

// creating the model
var LogEntry = mongoose.model('LogEntry', LogEntrySchema);

// exposing exports
module.exports.Model = LogEntry;
module.exports.Schema = LogEntrySchema;
