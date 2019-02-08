var express = require('express');
var router = express.Router();
var passport = require('passport');
var categoria = require('../controllers/CategoriaControlller');
var categoriaController = new categoria;
var dependencia = require('../controllers/DependenciaController');
var dependenciaController = new dependencia;

var auth = function middleWare(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('err_cred', 'Inicia sesion!!!');
        res.redirect('/');
    }
};

/* GET home page. */
router.get('/', function (req, res, next) {
//insert rol
require('../controllers/datos/insert_rol');
    res.render('principal', {title: 'Geolocalizacion Loja'});
});
router.get('/iniciar_sesion', function (req, res, next) {
    res.render('iniciarSesion', {title: 'Inicia Sesion'});
});
router.get('/registrar', function (req, res, next) {
    res.render('registrar', {title: 'Registrate'});
});
router.get('/administracion', dependenciaController.verDependencia );

router.post('/registrar',
        passport.authenticate('local-signup', {
            successRedirect: '/iniciar_sesion',
            failureRedirect: '/registrar'
        }
        ));

router.post('/iniciar',
        passport.authenticate('local-signin',{
                successRedirect: "/administracion",
                    failureRedirect: "/iniciar"}));
                
router.post('/guardar/categoria', categoriaController.guardar);
router.post('/guardar/dependencia', dependenciaController.guardar);


//router.get('/administracion/katty', dependenciaController.verDependencia);
module.exports = router;