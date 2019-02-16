var express = require('express');
var router = express.Router();
var passport = require('passport');
var categoria = require('../controllers/CategoriaControlller');
var categoriaController = new categoria;
var dependencia = require('../controllers/DependenciaController');
var dependenciaController = new dependencia;
var cuenta = require('../controllers/CuentaController');
var cuentaController = new cuenta;
var galeria = require('../controllers/GaleriaController');
var galeriaController = new galeria;

var auth = function middleWare(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('err_cred', 'Inicia sesion!!!');
        res.redirect('/');
    }
};

/* GET home page. */
router.get('/', categoriaController.categoriaPrincipal); 
//{
require('../controllers/datos/insert_rol');

  // res.render('principal', {title: 'Geolocalizacion Loja'});
//});
router.get('/iniciar_sesion', function (req, res, next) {
    //insert rol
   // require('../controllers/datos/insert_rol');
    res.render('iniciarSesion', {title: 'Inicia Sesion'});
});
router.get('/registrar', function (req, res, next) {
    res.render('registrar', {title: 'Registrate'});
});
router.get('/cerrar_sesion', cuentaController.cerrar );
router.get('/administracion', function (req, res, next) {
    res.render('administracion', {title: 'Administracion'});
} );

router.get('/ver/categoria', categoriaController.ListaCategoria);
router.get('/ver/dependencia', dependenciaController.verDependencia);
router.get('/ver/galeria', galeriaController.verG);


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
router.post('/guardar/galeria', galeriaController.guardar);
router.post('/guardar/imagen',  galeriaController.guardarImagen);


//router.get('/administracion/katty', dependenciaController.verDependencia);
module.exports = router;