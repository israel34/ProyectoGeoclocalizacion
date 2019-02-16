'use strict';
var models = require('../models/ind');
var Dependencia = models.dependencia;
var Galeria = models.galeria;
const uuidv4 = require('uuid/v4');
//para subir archivos
var fs = require('fs');
var maxFileSize = 1 * 1024 * 1024;
var extensiones = ["jpg", "png"];
var formidable = require('formidable');
class GaleriaController {
    guardar(req, res) {
        Galeria.create({
            id_dependencia: req.body.dependencia,
            foto: 'fiavl2017_cpr_5716.jpg',
            external_id: uuidv4()
        }).then(function (newfoto, created) {
            res.redirect('/ver/galeria');
            if (newfoto) {
                req.flash('info', 'Se ha creado correctamente');
                console.log('se ha creado foto');
                
            }
        });
    }
   
    verG(req, res) {
        Dependencia.findAll({}).then(function (listaD) {
            console.log('lista.................................' + listaD);
            if (listaD) {
                Galeria.findAll({include: {model: Dependencia }}).then(function (galeria) {
            //console.log('galeria.................................' + galeria);
            
            res.render('galeria',
                    {
                        rols: req.user.rol,
                        listaD: listaD,
                        title: 'Galeria',
                        galeria: galeria
                   });
        });

            }
            
        });
       // console.log('Prueba...........' + req.user);
        
    }
    guardarImagen(req, res) {        
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {        
            console.log(files.archivo);
            if (files.archivo.size <= maxFileSize) {
                var extension = files.archivo.name.split(".").pop().toLowerCase();
                if (extensiones.includes(extension)) {
                    var nombre = fields.external + "." + extension;
                    fs.rename(files.archivo.path, "public/img/galeria/" + nombre, function (err) {
                        if (err)
                            next(err);
                        Galeria.update({
                            foto: nombre
                        }, {where: {external_id: fields.external}}).then(function (updatedImagen, created) {
                            res.redirect('/ver/galeria');
                            if (updatedImagen) {
                                console.log("Segun yo guarde " + nombre);
                                req.flash('info', 'Se ha subido correctamente', false);
                                res.redirect('/ver/galeria');
                            }
                        });
                    });
                } else {
                    GaleriaController.eliminar(files.archivo.path);
                    req.flash('error', 'Error de extension');
                    res.redirect('/ver/galeria' + fields.external);
                    console.log("error de extension");
                }
            } else {
                GaleriaController.eliminar(files.archivo.path);
                req.flash('error', 'Error de tamanio se admite ' + maxFileSize, false);
                res.redirect('/ver/galeria' + fields.external);
                console.log("error de tamanio solo se adminte " + maxFileSize);

            }
        });
    }
     static eliminar(link) {
        fs.exists(link, function (exists) {
            if (exists) {                
                console.log('File exists. Deleting now ...');
                fs.unlinkSync(link);
            } else {                
                console.log('No se borro ' + link);
            }
        });
    }

};
module.exports = GaleriaController;

