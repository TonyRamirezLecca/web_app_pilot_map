const router = require('express').Router();
let User = require('../models/users.model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post(async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const username = req.body.username;
        const password = hashedPassword;

        const newUser = new User({ username, password, location: [] });
        newUser.save()
            .then((newUser) => {
                res.json('User Added!');
            })
            .catch(err => res.status(400).json('Error with adding user: ' + err));
    }
    catch {
        console.log("Error hashing password");
    }
})

router.route('/login').post((req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            return res.status(500).json(error);
        }
        if (!user) {
            return res.status(401).json(info.message);
        }

        jwt.sign({ user }, 'secretkey', (err, token) => {
            let response = {
                "id": user._id,
                "token": token
            }
            response = JSON.stringify(response);
            res.write(JSON.stringify(response));
            res.end();
        })
    })(req, res, next);
})


module.exports = router; 