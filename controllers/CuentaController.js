'use strict';
var models = require('../models/ind');
var Cuenta = models.cuenta;
class CuentaController{
    cerrar(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
    principalUsuario(req, res){
        res.render('principalUsuario',
        {title: 'Usuario'}
        );
    }
}
module.exports = CuentaController;
 