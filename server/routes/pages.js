const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/setup', (req, res) => {
    bcrypt.hash('password', 10, function(err, hash) {
        const nick = new User({
            username:'Raf',
            password:hash,
            groups:[1]
        });

        nick.save(function (err) {
            if(err) {
                throw err;
            }

            res.json({success: true});
        })
    });

});

module.exports = router;