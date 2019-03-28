'use strict'

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();

var mdAuth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
var mdUpload = multipart({uploadDir: './uploads/users'});

api.get('/pruebas-del-controlador', mdAuth.ensureAuth, userController.pruebasAuth);
api.get('/pruebas-del-controlador-test', userController.test);
api.post('/register', userController.addUser);
api.post('/login', userController.login);
api.put('/update-user/:id', mdAuth.ensureAuth, userController.updateUser);
api.post('/upload-image-user/:id', [mdAuth.ensureAuth, mdUpload], userController.uploadImage);
api.get('/get-image-file/:imageFile', userController.getImageFile);
api.get('/get-keepers', userController.getKeepers);
api.get('/get-users', userController.getUsersTest);



module.exports = api;