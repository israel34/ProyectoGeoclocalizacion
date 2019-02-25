'use strict';
var models = require('../models/ind');
var Dependencia = models.dependencia;
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
var Galeria = models.galeria;
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
                external_id: uuidv4(),
                latitud: req.body.latitud,
                longitud: req.body.longitud

            }).then(function (newDependencia) {

                if (newDependencia) {
                    res.redirect('/ver/dependencia');
                    console.log('Se guardo dependencia');
                }
            });
        } else {
            Dependencia.update({
                nombre: req.body.nombreDependencia,
                descripcion: req.body.descripcion,
                telefono: req.body.telefono,
                horarioAtencion: req.body.horario,
                id_categoria: req.body.categoria,
                latitud: req.body.latitud,
                longitud: req.body.longitud

            }, {where: {external_id: req.body.external1}}).then(function (updateddependencia, created) {
                res.redirect('/ver/dependencia');
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
        if (dependencias) {
            console.log(dependencias.length);
            console.log(dependencias[0]);
            console.log(dependencias[0].dataValues);
            getGaleriasPorNombreDeDependencia([], dependencias, 0, function (resultado){
                console.log(resultado);
                res.status(200).json(resultado);
            });
        }
        res.status(200).json(dependencias);
    }).catch(function (err) {
        res.status(500).json(err);
    });
}


}

function  getGalerias(galerias, dependencias, pos, callback) {
  
    if (pos < dependencias.length) {
        var id_dependencia = dependencias[pos].dataValues.id;
        Galeria.findAll({where: {id_dependencia: id_dependencia}}).then(function (galeria) {
            galerias.push({
                id_dependencia: id_dependencia,
                url: galeria[0].dataValues.foto
            });
            pos = pos + 1;
            getGalerias(galerias, dependencias, pos, callback);
        }).catch(function (err) {
            console.log("galerias " + err);
            getGalerias(galerias, dependencias, pos, callback)
        });
    } else {
        callback(galerias);
    }
}

function  getGaleriasPorNombreDeDependencia(resultado, dependencias, pos, callback) {
   
if (pos < dependencias.length) {
    var id_dependencia = dependencias[pos].dataValues.id;
    Galeria.findAll({where: {id_dependencia: id_dependencia}}).then(function (galeria) {
        resultado.push({
            dependencia: dependencia[pos].dataValues,
            url: galeria[0].dataValues.foto
        });
        pos = pos + 1;
        getGaleriasPorNombreDeDependencia(resultado, dependencias, pos, callback);
    }).catch(function (err) {
        console.log("galerias " + err);
        getGaleriasPorNombreDeDependencia(resultado, dependencias, pos, callback)
    });
} else {
    callback(resultado);
}
}





module.exports = DependenciaController;




