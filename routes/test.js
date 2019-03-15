'use strict'

var express = require('express');
var testController = require('../controllers/test');

var api = express.Router();

api.get('/from-test-controller', testController.test);
api.post('/from-test-controller-post', testController.test);


module.exports = api;