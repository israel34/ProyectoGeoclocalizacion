'use strict';
var models = require('../models/ind');
const uuidv4 = require('uuid/v4');
var Cuenta = models.cuenta;
var Dependencia = models.dependencia;
var Galeria = models.galeria;
var Puntuacion = models.puntuacion;
var Persona = models.persona;

class CuentaController{
    cerrar(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
    principalUsuario(req, res){
        var logeado = false;
        if(req.isAuthenticated()){
            logeado = true;
        }
        if(req.query.id){
            Dependencia.findAll({where: {id: req.query.id}}).then(function (dependencia) {
                if (dependencia) {
                    Galeria.findAll({where: {id_dependencia: dependencia[0].dataValues.id}}).then(function (galeria) {
                        if (galeria) {
                            if(galeria.length>0){
                                galeria.forEach(foto => {
                                    foto.dataValues.foto = 'img/galeria/' + foto.dataValues.foto;
                                });
                            }
                            Puntuacion.findAll({where: {id_dependencia: dependencia[0].dataValues.id}}).then(function (puntos) {
                                if (puntos) {
                                    getPersonaComentario([], puntos, 0, function(puntuaciones){
                                        res.render('principalUsuario', {title: 'Usuario', dependencia: dependencia, galeria: galeria, puntuaciones: puntuaciones, login:logeado});
                                    });                                    
                                }
                            }).catch(function (err) {
                                res.render('principalUsuario', {title: 'Usuario', dependencia: [], galeria: [], puntuaciones: [] , login: false});
                            });
                        }
                    }).catch(function (err) {
                        res.render('principalUsuario', {title: 'Usuario', dependencia: [], galeria: [], puntuaciones: [] , login: false});
                    });
                }
            }).catch(function (err) {
                res.render('principalUsuario', {title: 'Usuario', dependencia: [], galeria: [], puntuaciones: [] , login: false});
            });
        }else{
            res.render('principalUsuario', {title: 'Usuario', dependencia: [], galeria: [], puntuaciones: [] , login: false});
        }
    }
    guardarComentario(req,res){
        if(req.user){
            Persona.findAll({where: {external_id: req.user.id_persona}}).then(function (persona) {
                if(persona){
                    var id_persona = persona[0].dataValues.id;
                    Puntuacion.create({
                        ranKing: req.body.estrellas,
                        comentario: req.body.comentario,
                        external_id: uuidv4(),
                        id_persona: id_persona,
                        id_dependencia: req.body.id_dependencia
                    }).then(function (newPuntuacion, created) {
                        if  (newPuntuacion){
                            res.redirect('/principal_usuario?id='+req.body.id_dependencia);
                            req.flash('info', 'Se ha creado correctamente');
                        }            
                    }).catch(function(err){
                        res.redirect('/iniciar_sesion');    
                    });
                }else{
                    res.redirect('/iniciar_sesion');
                }
            }).catch(function (err) {
                res.redirect('/iniciar_sesion');
            });
        }else{
            res.redirect('/iniciar_sesion');
        }
    }
}

function getPersonaComentario(puntuaciones, puntos, pos, callback){
    if(pos<puntos.length){
        var id_persona = puntos[pos].dataValues.id_persona;
        console.log(id_persona);
        Persona.findAll({where: {id: id_persona}}).then(function (per) {
            puntuaciones.push({
                punto: puntos[pos].dataValues,
                persona: per[0].dataValues
            });
            pos = pos + 1;
            getPersonaComentario(puntuaciones, puntos, pos, callback);
        }).catch(function (err) {
            pos = pos + 1;
            getPersonaComentario(puntuaciones, puntos, pos, callback);
        });
    }else{
        callback(puntuaciones);
    }
}

module.exports = CuentaController;
