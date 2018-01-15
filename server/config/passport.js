const TwitterStrategy  = require('passport-twitter').Strategy;

const User = require('./database').User;

const twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY;
const twitterSecret = process.env.TWITTER_SECRET;
const twitterCallbackUrl = process.env.TWITTER_CALLBACK_URL;

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new TwitterStrategy({
        consumerKey     : twitterConsumerKey,
        consumerSecret  : twitterSecret,
        callbackURL     : twitterCallbackUrl
    }, function(token, tokenSecret, profile, done) {
            process.nextTick(function() {
                User.findOne({
                    '_id': profile.id
                }, function(err, user) {
                    if(err)
                        return done(err);
                        
                    if(user) {
                        return done(null, user);
                    } else {
                        // if there is no user, create them
                        var newUser = new User();
                        
                        // set all of the user data that we need
                        newUser._id = profile.id;
                        newUser.token = token;
                        newUser.username = profile.username;
                        if(profile.photos[0]) {
                            newUser.img = profile.photos[0].value;    
                        } // ELSE ADD PLACEHOLDER
                        
                        
                        newUser.save(function(err) {
                            if(err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

};