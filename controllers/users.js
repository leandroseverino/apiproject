const User = require('../models/user');

module.exports = {
    indexCallback: (req, res, next) => {
        /* Callback way */
        User.find({}, (err, users) => {
            if (err) {
                next(err);
            }
            res.status(200).json(users);
        });
    },
    /* Promisses way */
    index: (req, res, next) => {
        /* Callback way */
        User.find({})
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                next(err);
            });
    },
    /* Callback way */
    newUserCallback: (req, res, next) => {
        // console.log('Request body content', req.body);
        const newUser = new User(req.body);
        //console.log('New User contents !', newUser);
        newUser.save((err, user) => {
            if (err) {
                next(err);
            }
            console.log('new user added to collection !', user);
            res.status(201).json(user);
        });
    },
    /* Promisse way */
    newUser: (req, res, next) => {
        // console.log('Request body content', req.body);
        const newUser = new User(req.body);
        //console.log('New User contents !', newUser);
        newUser.save()
            .then(user => {
                console.log('new user added to collection !', user);
                res.status(201).json(user);
            })
            .catch(err => {
                next(err);
            });
    } 
};