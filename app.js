'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var animal_routes = require('./routes/animal');
var test_routes = require('./routes/test');

// middlewares de body-parseruse
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//COnfiguracion de cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//configuracion de rutas base
app.use('/api', user_routes);
app.use('/api', animal_routes);
app.use('/api', test_routes);

console.log('somethingaa');

app.get('/probando',(req, res)=>{
    res.status(200).send({message: 'Este es el metodo probandoaaa'})
});

//Exportar el modulo
module.exports = app;