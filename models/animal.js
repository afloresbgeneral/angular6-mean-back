'use strict'

var mongoose = require('mongoose');
var schema = mongoose.schema;

var animalSchema = schema({
    name: String,
    description: String,
    year: number,
    image: String,
    user: { type: Schema.ObjectId, ref: 'User'}
});

 module.exports = mongoose.model('Animal', animalSchema);