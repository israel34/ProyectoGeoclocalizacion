'use strict';
var models = require('../models/ind');
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
class CategoriaController {
    
    guardar(req, res, next) {
       Categoria.create({
           nombre: req.body.nombre,
            external_id: uuidv4()
            
        }).then(function (newDependencia) {
            res.redirect('/administracion');
                console.log('Se guardo categoria');
            if(newDependencia) {
               // req.flash('info', 'Se ha creado correctamente');
               //res.redirect('/administracion');
                //console.log('Se guardo dependencia');
            }
        });
    }
    
   
    
}
module.exports = CategoriaController;



