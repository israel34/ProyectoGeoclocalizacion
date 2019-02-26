'use strict';
var models = require('../models/ind');
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
class CategoriaController {
    guardar(req, res) {
        //console.log('external............................' + req.body.external);
        if (req.body.external == 0) {
            Categoria.create({
            external_id: uuidv4(),
            nombre: req.body.nombre
        }).then(function (newCategoria, created) {
            if  (newCategoria){
                console.log('Se guardo categoria............');
                res.redirect('/ver/categoria');
                req.flash('info', 'Se ha creado correctamente');
                //res.redirect('/administracion');
            }            
        });
        }
        else{
             Categoria.update({            
            nombre: req.body.nombre
        }, {where: {external_id: req.body.external}}).then(function (updatedcategoria, created) {
            res.redirect('/ver/categoria');
            if(updatedcategoria) {
                req.flash('info', 'Se ha creado correctamente', false);                
                console.log('Se modifico categoria............');
            }
        });
        } 
    }
    categoriaPrincipal(req, res){
        Categoria.findAll({}).then(function (listaC) {
            require('./datos/insert_rol');

            var logeado = false;
            if(req.isAuthenticated()){
                logeado = true;
            }
            res.render('principal', { title: 'Geolocolizacion Loja', categoria: listaC, statusLogin: logeado});
        });
    }
    ListaCategoria(req, res){
        console.log(req.user);
        if(req.user.rol==='administrador'){
            Categoria.findAll({}).then(function (listaC) {
            //console.log('katy.................................' );
            res.render('categoria',
                    {
                         title: 'Categorias',
                        categoria: listaC                     
                   });
        });
        }else if(req.user.rol==='usuario'){
            res.redirect('/');
        }
    }  
    
}
module.exports = CategoriaController;

