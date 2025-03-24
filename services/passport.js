const passport = require('passport');//knows how to handle the authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy;//tells which mechanism should we use to authenticate the user
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id).then( user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},
( accessToken, refreshToken, profile, done ) => {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
    User.findOne({googleId: profile.id}).then((existingUser) => {
        if(existingUser){
            //we already have a user with profile id
            done(null, existingUser);
        }
        else{
            new User({googleId: profile.id}).save().then(
                user => {
                    done(null, user);
                }
            );
        }
    });
}));//telling the passport to use the google strategy