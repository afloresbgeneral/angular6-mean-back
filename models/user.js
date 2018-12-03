'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    role: String
});

 module.exports = mongoose.model('User', userSchema);