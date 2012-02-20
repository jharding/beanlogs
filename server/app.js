// module dependencies
var conf = require('./conf.js');
var express = require('express');
var mongoose = require('mongoose');
var mongooseAuth = require('mongoose-auth');
var routes = require('./routes');
var models = require('./models');

var app = module.exports = express.createServer();

// configuration
app.configure(function(){
  mongoose.connect(conf.mongo.uri);
  
  mongooseAuth.helpExpress(app);
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(mongooseAuth.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// load route middlewares
var verifyUser = routes.middleware.verifyUser;

// routes
app.get('/', routes.static.homepage);
app.post('/api/log', verifyUser, routes.user.addLogEntry);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
