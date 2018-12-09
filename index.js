'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

console.log(port, 'puertoo');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo', {useNewUrlParser: true})
    .then(
        ()=>{
            console.log('la coneccion a la base de datos zoo se ha realizado correctamentee');
            app.listen(port, ()=> {
                console.log('El servidor local con node y express esta en linea');
            });
        }
    ).catch(err => console.log(err))