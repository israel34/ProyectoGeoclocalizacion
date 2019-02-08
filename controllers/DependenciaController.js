'use strict';
var models = require('../models/ind');
var Dependencia = models.dependencia;
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
class DependenciaController {

    guardar(req, res, next) {
        console.log('external.....................' + req.body.external1);
        if (req.body.external1 == 0) {
            Dependencia.create({
            nombre: req.body.nombreDependencia,
            descripcion: req.body.descripcion,
            telefono: req.body.telefono,
            horarioAtencion: req.body.horario,
            id_categoria: req.body.categoria,
            external_id: uuidv4()

        }).then(function (newDependencia) {

            if (newDependencia) {
                res.redirect('/administracion');
                console.log('Se guardo dependencia');
            }
        });
        } else {
             Dependencia.update({
            nombre: req.body.nombreDependencia,
            descripcion: req.body.descripcion,
            telefono: req.body.telefono,
            horarioAtencion: req.body.horario,
            id_categoria: req.body.categoria

        }, {where: {external_id: req.body.external1}}).then(function (updateddependencia, created) {
            res.redirect('/administracion');
            if(updateddependencia) {
                req.flash('info', 'Se ha creado correctamente', false);
                
                console.log('Se modifico dependencia............');
            }
        });
        }
        
    }
    verDependencia(req, res) {
        Categoria.findAll({}).then(function (categoria) { 
            if (categoria) {
                Dependencia.findAll({include: {model: Categoria }}).then(function (listaCategoria) {
            //console.log('katy.................................' );
            res.render('administracion',
                    {
                        rols: req.user.rol,
                        listaD: listaCategoria,
                        title: 'Administracion',
                        categoria: categoria
                        


                    });
        });

            }
            
        });
       // console.log('Prueba...........' + req.user);
        
    }

}
module.exports = DependenciaController;




