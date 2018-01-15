const User = require('../../config/database').User;
const passport = require('passport');
require('../../config/passport')(passport);

// get user data
exports.get_user = function(req, res) {
	// if user logged in, send user info
	if (typeof req.user != "undefined") {
		res.json({
			user: req.user
		});
	} else {
		res.json({
			user: false
		});
	}
};

// log user out
exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};