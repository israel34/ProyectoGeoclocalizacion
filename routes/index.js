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
var reportes = require('../controllers/reporteController');
var reporteController = new reportes;

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

router.get('/principal_usuario', cuentaController.principalUsuario);

router.get('/iniciar_sesion', function (req, res, next) {
    //insert admin
    require('../controllers/datos/insert_admin');
    res.render('iniciarSesion', {title: 'Inicia Sesion'});
});
router.get('/registrar', function (req, res, next) {
    res.render('registrar', {title: 'Registrate'});
});
router.get('/cerrar_sesion', cuentaController.cerrar );

router.get('/ver/categoria', categoriaController.ListaCategoria);
router.get('/ver/dependencia', dependenciaController.verDependencia);
router.get('/ver/galeria', galeriaController.verG);

router.get('/admin_buscar_dependencias/:nombre', dependenciaController.buscarDependencia);
//router.get('/admin_buscar_categorias/:nombre', dependenciaController.buscarCategoria);

router.post('/registrar',
        passport.authenticate('local-signup', {
            successRedirect: '/iniciar_sesion',
            failureRedirect: '/registrar'
        }
        ));

router.post('/iniciar',
        passport.authenticate('local-signin',{
                successRedirect: "/ver/categoria",
                    failureRedirect: "/iniciar"}));
                
router.post('/guardar/categoria', categoriaController.guardar);
router.post('/guardar/comentario', cuentaController.guardarComentario);
router.post('/guardar/dependencia', dependenciaController.guardar);
router.post('/guardar/galeria', galeriaController.guardar);
router.post('/guardar/imagen',  galeriaController.guardarImagen);
router.get('/reportes', reporteController.reportes);

//router.get('/administracion/katty', dependenciaController.verDependencia);
module.exports = router;