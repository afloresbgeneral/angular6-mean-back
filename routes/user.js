'use strict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();

var mdAuth = require('../middlewares/authenticate');

api.get('/pruebas-del-controlador', mdAuth.ensureAuth, userController.pruebas);
api.get('/pruebas-del-controlador-test', userController.test);
api.post('/register', userController.addUser);
api.post('/login', userController.login);


module.exports = api;