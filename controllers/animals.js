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

    animalModel.find({}).exec((err, animals) => {
        if(err) {
            res.status(200).send({
                message: 'Error al listar los animales',
            });
        } else {
            if(!animals) {
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

module.exports = {
    pruebas,
    saveAnimal,
    listAnimals
}