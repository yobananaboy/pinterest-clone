require("babel-core/register");
require('dotenv').config();
var http = require('http');
var path = require('path');

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

app.use(express.static('public'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var server = http.createServer(app);

require('./server/routes/routes')(app, passport);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log('server listening at ' + process.env.PORT);
});