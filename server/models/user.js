// module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseAuth = require('mongoose-auth');
var LogEntry = require('./').logEntry.Model;
var LogEntrySchema = require('./').logEntry.Schema;

var UserSchema = new Schema({
  log: [ LogEntrySchema ]
});

// setting up mongoose-auth
var User = null;
UserSchema.plugin(mongooseAuth, {
  everymodule: {
    everyauth: {
      User: function() {
        return User;
      }
    }
  },
  password: {
    loginWith: 'email',
    everyauth: {
      getLoginPath: '/login',
      postLoginPath: '/login',
      loginView: 'login.jade',
      getRegisterPath: '/register',
      postRegisterPath: '/register',
      registerView: 'register.jade',
      loginSuccessRedirect: '/',
      registerSuccessRedirect: '/'
    }
  }
});

/*** methods ***/

UserSchema.methods.addLogEntry = function(data, callback) {
  callback = callback || function() {};
  
  var entry = new LogEntry(data);
  this.log.push(entry);
  
  this.save(function(error) {
    if (!error) {
      console.log('saved');
      console.log('URL: ' + data.url);
      console.log('time: ' + data.timestamp);
    }
    
    callback(error);
  });
};

// creating the model
User = mongoose.model('User', UserSchema);

// exposing exports
module.exports.Model = User;
module.exports.Schema = UserSchema;
