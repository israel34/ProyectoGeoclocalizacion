'use strict';
var models = require('../models/ind');
var Dependencia = models.dependencia;
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
class dependenciaController {
    
    guardar(req, res, next) {
       Dependencia.create({
           nombre: req.body.nombred,
           descripcion: req.body.descripcion,
           telefono: req.body.telefono,
           horarioAtencion: req.body.horario,
            external_id: uuidv4()
            
        }).then(function (newDependencia) {
            res.redirect('/administracion');
                console.log('Se guardo dependencia');
            if(newDependencia) {
               // req.flash('info', 'Se ha creado correctamente');
               //res.redirect('/administracion');
                //console.log('Se guardo dependencia');
            }
        });
    }
    verMarca(req, res, next){
        Categoria.findAll({where: {estado: true}}).then(function (categoria){
            res.render('administracion',
            {
                rols: req.user.rols,
                categoria: categoria
            }
            );
        });
        
    }
    
}
module.exports = dependenciaController;




