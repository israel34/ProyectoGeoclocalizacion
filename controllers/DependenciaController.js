'use strict';
var models = require('../models/ind');
var Dependencia = models.dependencia;
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');

class DependenciaController {

    guardar(req, res, next) {
        // console.log('external.....................' + req.body.external1);
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
                if (updateddependencia) {
                    req.flash('info', 'Se ha creado correctamente', false);

                    console.log('Se modifico dependencia............');
                }
            });
        }

    }
    verDependencia(req, res) {
        Categoria.findAll({}).then(function (categoria) {
            if (categoria) {
                Dependencia.findAll({include: {model: Categoria}}).then(function (listaD) {
                    //console.log('katy.................................' );
                    res.render('dependencia',
                            {
                                rols: req.user.rol,
                                listaD: listaD,
                                title: 'Dependencia',
                                categoria: categoria
                            });
                });

            }

        });
    }

    buscarDependencia(req, res) {
        var nombre = req.params.nombre;
        Dependencia.findAll({where: {nombre: {$like: '' + nombre + '%'}}}).then(function (dependencias) {
            res.status(200).json(dependencias);
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }

    buscarCategoria(req, res) {
        var nombre = req.params.nombre;
        Categoria.findAll({where: {nombre: {$like: '' + nombre + '%'}}}).then(function (categorias) {
            if (categorias) {
                console.log(categorias.length);
                buscarDependencias([], categorias, 0, function (dependencias) {
                    console.log(dependencias);
                    res.status(200).json(dependencias);
                });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json(err);
        });

    }

    /* 
     listarDependencia(req, res) {
     Dependencia.findAll({where: {nombre: {}}}).then(function (dependencias) {
     res.status(200).json(dependencias);
     }).catch(function (err) {
     res.status(500).json(err);
     });
     }*/

}

function   buscarDependencias(dependencias, categorias, pos, callback) {
    console.log('hola mundo valio la pena');
    if (pos < categorias.length) {
        var id_categoria = categorias[pos].dataValues.id;
        console.log(id_categoria);
        Dependencia.findAll({where: {id_categoria: id_categoria}}).then(function (aux) {
            dependencias.push(aux);
            pos = pos + 1;
            buscarDependencias(dependencias, categorias, pos, callback);
        }).catch(function (err) {
            pos = pos + 1;
            buscarDependencias(dependencias, categorias, pos, callback);
        });
    } else {
        callback(dependencias);
    }
};

module.exports = DependenciaController;




