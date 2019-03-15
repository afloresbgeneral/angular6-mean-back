'use strict'
//cargando modulos

function test (req, res) {
    var params = req.body;
    console.log('DENTRO DE TEST', params);
    res.status(200).send({
        message: 'Prueba desde el controlador test y rutas',
        request: params
    });
}

//exportacion
module.exports = {
    test
}