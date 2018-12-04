'use strict'
//cargando modulos
var fs = require('fs');
var path = require('path');

//cargando modelos
var userModel = require('../models/user');
var animalModel = require('../models/animal');

//funciones
function pruebas (req, res) {
    res.status(200).send({
        message: 'Probando el controlador de animales y la accion pruebassss',
        user: req.user
    });
}

function saveAnimal(req, res) {

    var animal = new animalModel();
    var params = req.body;
    console.log(params, 'params');
    if(params.name) {
        animal.name = params.name;
        animal.description = params.description;
        animal.year = params.year;
        animal.image = null;
        animal.user = req.user.sub;

        animal.save((err, animalStored)=> {
            if(err) {
                res.status(400).send({
                    message: 'Error al guardar animal',
                });
            } else {
                if(!animalStored) {
                    res.status(404).send({
                        message: 'No se pudo guardar el animal',
                    });
                } else {
                    res.status(200).send({
                        message: 'Guardado con éxito',
                        animal: animalStored
                    });
                }
            }
        })
    } else {
        res.status(404).send({
            message: 'El nombre es un campo obligatorio',
        });
    }
}

function listAnimals(req, res){

    animalModel.find({}).populate({path: 'user'}).exec((err, animals) => {
        if(err) {
            res.status(200).send({
                message: 'Error al listar los animales',
            });
        } else {
            if(animals.length == 0) {
                res.status(200).send({
                    message: 'No existe registro de animales',
                });
            } else {
                res.status(200).send({
                    message: 'Lista de animales',
                    animals: animals
                });
            }
        }
    });
}

function findAnimal(req, res){

    var animalId = req.params.id;
    animalModel.findById(animalId).populate({path: 'user'}).exec( (err, animal) => {
        if(err){
            res.status(400).send({
                message: 'Error buscando animal',
            });
        } else {
            if(!animal) {
                res.status(400).send({
                    message: 'No hay animales registrados',
                });
            } else {
                res.status(400).send({
                    message: 'Successfull',
                    animal: animal
                });
            }
        }
    });
}

function updateAnimal(req, res) {
    //obteniendo el id desde el url
    var animalId = req.params.id;
    var updateAnimal = req.body;

    console.log(updateAnimal);

    animalModel.findByIdAndUpdate(animalId, updateAnimal, {new: true}, (err, animalUpdated) => {
        if(err) {
            res.status(400).send({
                message: 'Error al conectarse al servidor'
            });
        } else {
            if(!animalUpdated){
                res.status(400).send({
                    message: 'No se encuentran registros de el animal'
                });
            } else {
                res.status(200).send({
                    message: 'Animal editado correctamente',
                    animalUpdated: animalUpdated
                });
            }
        }
    });
}

function uploadImage(req, res) {

    //obteniendo el id por parametros del url
    var animalId = req.params.id;
    var fileName = 'no subido';

    if(req.files){
        //obteniendo direccion del archivo y 
        //separando por cadenas para obtener nombre y extension
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[2];
        var ext_split = fileName.split('.');
        var fileExt = ext_split[1];

        //validando por extension
        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

            animalModel.findByIdAndUpdate(animalId, {image: fileName}, {new: true}, (err, animalUpdated) => {
                if(err) {
                    res.status(400).send({
                        message: 'Error al conectarse al servicio',
                    });
                } else {
                    if(!animalUpdated) {
                        res.status(400).send({
                            message: 'No se ha podido actualizar la imagen',
                        });
                    } else {
                        res.status(200).send({
                            message: 'Imagen actualizada correctamente',
                            animal: animalUpdated,
                            image: fileName
                        });
                    }
                }
            });
        } else {

            fs.unlink(filePath, (err) => {
                if(err){
                    res.status(401).send({
                        message: 'Extension no valida y fichero no borrado'
                    });
                } else {
                    res.status(401).send({
                        message: 'Extension no valida'
                    });
                }
            });
        }
    }
}

function getImageFile(req, res){

    var imageFile = req.params.imageFile;
    var pathFile = './uploads/animals/'+imageFile;

    fs.exists(pathFile, (exist) => {
        if(exist){
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(401).send({
                message: 'La imagen no existe'
            });
        }
    });
}

function deleteAninal(req, res) {
    //obteniendo el id desde el url
    var animalId = req.params.id;

    animalModel.findByIdAndDelete(animalId, (err, deleted) => {
        if(err) {
            res.status(401).send({
                message: 'Error al borrar el registro'
            });
        } else {
            if(!deleted) {
                res.status(401).send({
                    message: 'No existe el animal en el registro'
                });
            } else {
                res.status(200).send({
                    message: 'Registro borrado correctamente',
                    deleted
                });
            }
        }
    });
}

module.exports = {
    pruebas,
    saveAnimal,
    listAnimals,
    findAnimal,
    updateAnimal,
    uploadImage,
    getImageFile,
    deleteAninal
}