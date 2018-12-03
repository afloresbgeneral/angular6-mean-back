'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var animal_routes = require('./routes/animal');

// middlewares de body-parseruse
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//COnfiguracion de cabeceras y cors


//configuracion de rutas base
app.use('/api', user_routes);
app.use('/api', animal_routes);


// app.get('/probando',(req, res)=>{
//     res.status(200).send({message: 'Este es el metodo probando'})
// });

//Exportar el modulo
module.exports = app;