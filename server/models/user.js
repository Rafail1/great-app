let mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
let Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    groups: {type: Array, default: []}
});

UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('username must be unique'));
    } else {
        next(error, doc);
    }
});
UserSchema.methods.getToken = function () {
    const payload = {
        groups: this.groups,
        id: this._id
    };
    return jwt.sign(payload, config.secret, {
        expiresIn: 1440
    });
};
module.exports = mongoose.model('User', UserSchema);
