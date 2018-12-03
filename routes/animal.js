'use strict'

var express = require('express');
var animalController = require('../controllers/animals');

var api = express.Router();

var mdAuth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
var mdUpload = multipart({uploadDir: './uploads/animals'});

api.get('/pruebas-animales', mdAuth.ensureAuth, animalController.pruebas);
api.post('/save-animal', mdAuth.ensureAuth, animalController.saveAnimal);
api.get('/list-animals', mdAuth.ensureAuth, animalController.listAnimals);

module.exports = api;