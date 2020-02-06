const router = require('express').Router();
let Users = require('../models/users.model');
const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        next();
    }
    else {
        console.log('header not present');
        res.sendStatus(403);
    }
}

//CREATE
router.route('/:id').post(verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log('error');
            res.sendStatus(403);
        }
        else {
            Users.findById(req.params.id)
                .then(user => {
                    let newLocation = {
                        formatted_address: req.body.formatted_address,
                        coordinates: req.body.coordinates,
                        date: req.body.date,
                    }

                    let alreadyExists = false;
                    var i;
                    for (i = 0; i < user.locations.length; i++) {
                        if (user.locations[i].formatted_address === req.body.formatted_address) {
                            alreadyExists = true;
                        }
                    }

                    if (alreadyExists) {
                        res.status(400)
                    }
                    else {
                        user.locations.push(newLocation);
                        user.save()
                            .then(() => {
                                res.json({
                                    message: 'Location added...',
                                    authData
                                })
                            })
                            .catch(err => {
                                console.log('couldn\'t save');
                                res.status(400).json('Error: couldn\'t save :' + err)
                            });
                    }
                })
                .catch(err => res.status(400).json('Error, couldn\'t post :' + err));
        }
    });
})

//READ
router.route('/:id').get(verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log('error');
            res.sendStatus(403);
        }
        else {
            Users.findById(req.params.id)
                .then(user => {
                    res.json(user.locations);
                })
                .catch(err => res.status(400).json('Error, couldn\'t post :' + err));
        }
    });
})

//UPDATE

//DELETE
router.route('/:userID/:locationId').delete(verifyToken, (req, res) => {
    console.log('deleting route')
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        console.log('verifying');
        if (err) {
            console.log('could not verify');
            console.log('error');
            res.sendStatus(403);
        }
        else {
            console.log('verified')
            Users.findOneAndUpdate(
                { _id: req.params.userID },
                { $pull: { locations: { _id: req.params.locationId } } }
            )
                .then(response => {
                    res.send(response);
                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400).json('Error, couldn\'t remove :' + err)
                });
        }
    });
})


module.exports = router; 