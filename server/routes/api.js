const mongoose = require('mongoose');
const User = mongoose.model('User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.json({message: 'Welcome to the coolest API on earth!'});
});

router.post('/register', (req, res) => {
    if (req.body.password !== req.body.passwordConfirm) {
        return res.json({success: false, message: 'password not match with confirmation'});
    }
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        const newUser = new User({
            username: req.body.username,
            password: hash
        });
        newUser.save(function (err, user) {
            if (err) {
                console.log(err);
                return res.json({success: false, message: err.message});
            }
            res.json({success: true, token: user.getToken()});
        })
    })

});
router.post('/authenticate', (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found'});
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, success) {
                if (!success) {
                    res.json({success: false, message: 'Authentication failed. Wrong password'});
                } else {


                    res.json({success: true, message: 'Enjoy your token!)', token: user.getToken()});
                }
            })
        }
    })
});
router.use(function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }
});
router.get('/users', (req, res) => {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

module.exports = router;