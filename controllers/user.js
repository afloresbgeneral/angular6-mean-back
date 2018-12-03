'use strict'
//cargando modulos
var bcrypt = require('bcrypt-nodejs');
//cargando modelos
var userModel = require('../models/user');

// servicio jwt
var jwt = require('../services/jwt');

//funciones
function pruebas (req, res) {
    res.status(200).send({
        message: 'Probando el controlador de usuarios y la accion pruebassss',
        user: req.user
    });
}

function test (req, res) {
    res.status(200).send({
        message: 'Probando el controlador de usuarios y la accion test'
    });
}

function addUser(req, res){
    //crear objeto de usuario
    var user = new userModel();
    //recoger los parametros que llegan de la peticion (body)
    var params = req.body;
    console.log(params);

    //asignar los valores al usuario con los recibidos
    if (params.password && params.name && params.lastName && params.email) {
        user.name = params.name;
        user.lastName = params.lastName;
        user.password = params.password;
        user.email = params.email;
        user.role = 'ROLE_USER';

        userModel.findOne({
            email: user.email.toLowerCase()
        }, (err, issetUser) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al comprobar el usuario'
                });   
            } else {
                if(!issetUser) {
                     //cifrando la contraseña
                     bcrypt.hash(params.password, null, null, function(err, hash){
                      user.password = hash;
                  });
                  //guardando usuario en base de datos
                  user.save((err, userStored)=>{
                      if(err){
                          res.status(500).send({
                              message: 'Error al guardar el usuario'
                          });   
                      } else {
                          if(!userStored){
                          res.status(404).send({message: 'No se ha registrado el usuario'});
                          } else {
                              res.status(200).send({
                                  message: 'succesfull',
                                  user: userStored
                              });
                          }
                      }
                  });
                } else {
                    res.status(200).send({
                        message: 'El usuario introducido ya existe en la base de datos',
                        something: user
                    });
                }
            }
        });
 
    } else {
        res.status(200).send({
            message: 'Introduce los datos correctamente para poder registar al usuario',
            something: user
        });
    }
}

function login(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    userModel.findOne({
        email: email.toLowerCase()
    }, (err, issetUser) => {
        if (err) {
            res.status(500).send({
                message: 'Error al comprobar el usuario'
            });   
        } else {
            if(issetUser) {
                bcrypt.compare(password, issetUser.password, (err, check) => {
                    if(check) {

                        //comprobando el token 
                        if (params.gettoken) {
                            //generando el token
                            res.status(200).send({
                                message: 'generating token',
                                token: jwt.createToken(issetUser)
                            });  
                        } else {
                            res.status(200).send({
                                message: 'user found',
                                user: issetUser
                            });   
                        }

                    } else {
                        res.status(200).send({
                            message: 'wrong password',
                        }); 
                    }
                });

            } else {
                res.status(404).send({
                    message: 'El usuario introducido no existe en la base de datos',
                });
            }
        }
    });
}


//exportacion
module.exports = {
    pruebas,
    test,
    addUser,
    login
}