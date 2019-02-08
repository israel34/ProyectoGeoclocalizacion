'use strict';
var models = require('../models/ind');
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');


class CategoriaController {
    guardar(req, res) {
        console.log('external............................' + req.body.external);
        if (req.body.external == 0) {
            Categoria.create({
            external_id: uuidv4(),
            nombre: req.body.nombre
        }).then(function (newCategoria, created) {
            
                console.log('Se guardo categoria............');
                res.redirect('/administracion');
                req.flash('info', 'Se ha creado correctamente');
                //res.redirect('/administracion');
            
        });
        }
        else{
             Categoria.update({            
            nombre: req.body.nombre
        }, {where: {external_id: req.body.external}}).then(function (updatedcategoria, created) {
            res.redirect('/administracion');
            if(updatedcategoria) {
                req.flash('info', 'Se ha creado correctamente', false);
                
                console.log('Se modifico categoria............');
            }
        });
        }
    
        
    }
    
}
module.exports = CategoriaController;

