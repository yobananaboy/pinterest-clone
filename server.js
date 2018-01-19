require('babel-register')({
    presets: ["env", "react", "stage-2", "es2015"],
    plugins: ["transform-class-properties"]
});

require('dotenv').config();

var http = require('http');

var express = require('express');


var session = require('express-session');
var passport = require('passport');

var bodyParser = require('body-parser');

var app = express();

// Initialize Passport session
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.SECRET_KEY_BASE
}));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

var server = http.createServer(app);

// app.use('/', router);
require('./server/routes/routes')(app, passport, express);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log('server listening at ' + process.env.PORT);
});