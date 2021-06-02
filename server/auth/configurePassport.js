const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('Passport is asking to authenticate user: ', username, ' with password ', password)
    User.findOne({ username: username }, function(err, user) {
      console.log('  Found user', user)
      if (err) { return done(err); }
      if (!user) {
        console.log('  No user exists')
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        console.log('  Password doesn\'t match')
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('  Returning the user!')
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
  
passport.deserializeUser(function(_id, done) {
    User.findById(_id, function(err, user) {
        done(err, {
            _id: _id,
            username: user.username,
            isAgent: user.isAgent
        });
    });
});
