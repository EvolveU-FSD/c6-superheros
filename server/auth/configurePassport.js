const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const UserHome = require('../models/UserSqlite')

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('Passport is asking to authenticate user: ', username, ' with password ', password)
    UserHome.findByUsername(username)
      .then((user) => {
        //console.log('  Found user', user)
        if (!user) {
          console.log('  No user exists')
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('  Returning the user!')
        return done(null, user);  
      })
      .catch((err) => {
        done(err); 
      })
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
  
passport.deserializeUser(function(_id, done) {
  UserHome.findById(_id)
    .then((user) => {
      done(null, {
          _id: _id,
          username: user.username,
          isAgent: user.isAgent
      })
    })
    .catch((err) => {
      done(err)
    })
})
