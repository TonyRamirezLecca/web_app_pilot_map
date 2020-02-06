const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Load User Model
const User = require('./models/users.model');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            //Match User
            User.findOne({ username: username })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That user doesn\'t exists' });
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false, { message: 'Password is incorrect' });
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    })

}








/*
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Users = require('./models/users.model');

function initialize(passport, getUserById) {
    const authenticateUser = async (username, password, done) => {
        Users.findOne({ username: username }).then(res => {
            if (res) {
                let user = res;

                try {
                    const match = bcrypt.compare(password, user.password)
                        .then((res) => {
                            if (res) {
                                console.log('correct password');
                                return done(null, user);
                            }
                            else {
                                console.log('incorrect password');
                                return done(null, false, { message: "password incorrect" })
                            }
                        }).catch((e) => {
                            console.log('bcrypt error: ', e);
                        })

                } catch (e) {
                    return done(e)
                }
            }
            else {
                console.log('username doesn\'t exist');
                return null;
            }
        }).catch(err => console.log('error', err))
    }

    passport.use(new LocalStrategy({ usernameField: 'username' },
        authenticateUser));


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Users.findById(id, function (err, user) {
            done(err, user);
        })
    })

}

module.exports = initialize;


*/