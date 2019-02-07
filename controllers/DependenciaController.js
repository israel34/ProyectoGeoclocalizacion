'use strict';
var models = require('../models/ind');
var Dependencia = models.dependencia;
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
class DependenciaController {

    guardar(req, res, next) {
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
                        title: 'Administracion'
                        


                    });
        });

            }
            
        });
       // console.log('Prueba...........' + req.user);
        
    }

}
module.exports = DependenciaController;




