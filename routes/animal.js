'use strict'

var express = require('express');
var animalController = require('../controllers/animals');

var api = express.Router();

var mdAuth = require('../middlewares/authenticate');
var mdAdmin = require('../middlewares/isAdmin');

var multipart = require('connect-multiparty');
var mdUpload = multipart({uploadDir: './uploads/animals'});

api.get('/pruebas-animales', mdAuth.ensureAuth, animalController.pruebas);
api.post('/save-animal', [mdAuth.ensureAuth, mdAdmin.isAdmin], animalController.saveAnimal);
api.get('/list-animals', animalController.listAnimals);
api.get('/find-animal/:id', mdAuth.ensureAuth, animalController.findAnimal);
api.put('/update-animal/:id', mdAuth.ensureAuth, animalController.updateAnimal);
api.post('/upload-image/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin, mdUpload], animalController.uploadImage);
api.get('/get-image/:imageFile', animalController.getImageFile);
api.delete('/delete-animal/:id', [mdAuth.ensureAuth,  mdAdmin.isAdmin, mdUpload], animalController.deleteAninal);


module.exports = api;