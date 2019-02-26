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

/**
 * Redirecciona al usuario a la vista principal del sistema
 *
 * @section Home
 * @type get
 * @url /
*/
router.get('/', categoriaController.categoriaPrincipal); 

/**
 * Redirecciona al usuario a la vista donde se detalla la información de la dependencia.
 *
 * @section Principal usuario
 * @type get
 * @url /principal_usuario
 * @param {string} id 
*/
router.get('/principal_usuario', cuentaController.principalUsuario);

/**
 * Redirecciona al usuario a la pagina donde puede ingresar sus datos para inciar sesión en el sistema.
 *
 * @section Inciar sesión
 * @type get
 * @url /iniciar_sesion
*/
router.get('/iniciar_sesion', function (req, res, next) {
    //insert admin
    require('../controllers/datos/insert_admin');
    res.render('iniciarSesion', {title: 'Inicia Sesion'});
});

/**
 * Redirecciona al usuario a la vista donde puede ingresar sus datos para registrarse en el sistema.
 *
 * @section Registrarse
 * @type get
 * @url /registrar
*/
router.get('/registrar', function (req, res, next) {
    res.render('registrar', {title: 'Registrate'});
});

/**
 * Destruye los datos de la sesión activa y redirige a la página de Home
 *
 * @section Cerrar Sesión
 * @type get
 * @url /cerrar_sesion
*/
router.get('/cerrar_sesion', cuentaController.cerrar );

/**
 * Valida que tipo de usuario se ha logeado en el sistema (administrador | usuario), y redirecciona a la pantalla princial del mismo.
 *
 * @section Listado de categorías (administrador) | Home (usuario)
 * @type get
 * @url /ver/categoria
 */
router.get('/ver/categoria', categoriaController.ListaCategoria);

/**
 * Redirecciona al usuario a la pantalla donde se muestra una lista completa de todoas las dependencias registradas en el sistema.
 *
 * @section Lista de dependencias
 * @type get
 * @url /ver/dependencia
*/
router.get('/ver/dependencia', dependenciaController.verDependencia);

/**
 * Redirecciona al usuario a la vista donde se muestra la galería de imagenes de cada dependencia.
 *
 * @section Galería
 * @type get
 * @url /ver/galeria
 */
router.get('/ver/galeria', galeriaController.verG);

/**
 * Devuleve una lista completa de todas las dependencias cuyo nombre coincida con el parametro de busqueda denominado 'nombre'.
 *
 * @section projects
 * @type get
 * @url /admin_buscar_dependencias/:nombre
 * @param {string} nombre 
 */
router.get('/admin_buscar_dependencias/:nombre', dependenciaController.buscarDependencia);

/**
 * Devuleve una lista completa de todas las dependencias cuya categoría coincida con el parametro de busqueda denominado 'id'.
 *
 * @section projects
 * @type get
 * @url /admin_buscar_categorias/:id
 * @param {string} id 
 */
router.get('/admin_buscar_categorias/:id', dependenciaController.buscarCategoria);

/**
 * Recibe la información del usuario que va a ser registrado en el sistema, en caso de completarse redirecciona al usuario a la pantalla para iniciar sesión.
 *
 * @section projects
 * @type get
 * @url /registrar
 * @param {string} nombre
 * @param {string} apellido 
 * @param {string} telefono
 * @param {string} correo 
 * @param {string} clave
 */
router.post('/registrar',
        passport.authenticate('local-signup', {
            successRedirect: '/iniciar_sesion',
            failureRedirect: '/registrar'
        }
));

/**
 * Recibe la información del usuario que quiere acceder al sistema, en caso de exito, el usuario es redireccionado a /ver/categoria.
 *
 * @section Iniciar sesión
 * @type get
 * @url /iniciar
 * @param {string} correo
 * @param {string} clave
*/
router.post('/iniciar',
        passport.authenticate('local-signin',{
                successRedirect: "/ver/categoria",
                    failureRedirect: "/iniciar"}));


/**
 * Recibe la información de la nueva categoría a ser guardada en el sistema.
 *
 * @section Guardar categoría
 * @type post
 * @url /guardar/categoria
 * @param {string} nombre
 */
router.post('/guardar/categoria', categoriaController.guardar);

/**
 * Recibe la información del nuevo comentario de una dependencia a ser guardado en el sistema. 
 *
 * @section Guardar comentario
 * @type get
 * @url /guardar/comentario
 * @param {string} comentario
 * @param {string} ranKing
 */
router.post('/guardar/comentario', cuentaController.guardarComentario);

/**
 * Recibe la información de la nueva dependencia a ser guardada en el sistema. 
 *
 * @section Guardar dependencia
 * @type post
 * @url /guardar/dependencia
 * @param {string} id_categoria 
 * @param {string} nombre
 * @param {string} desccripcion
 * @param {string} telefono
 * @param {string} horarioAtencion
 * @param {string} longitud
 * @param {string} latitud 
 */
router.post('/guardar/dependencia', dependenciaController.guardar);

/**
 * Recibe la información de la nueva galería de una dependencia a ser guardada en el sistema. 
 *
 * @section Guardar galería
 * @type post
 * @url /guardar/galeria
 * @param {string} id_dependencia
 */
router.post('/guardar/galeria', galeriaController.guardar);

/**
 * Recibe la información de la nueva imagen de la galería de una dependencia a ser guardada en el sistema. 
 *
 * @section Guardar imagen
 * @type post
 * @url /guardar/imagen
 * @param {string} foto
 */
router.post('/guardar/imagen',  galeriaController.guardarImagen);

/**
 * Redirecciona al usuario a la vista donde se puede observar el reporte del promedio de la puntuación de cada dependencia.
 *
 * @section Reportes
 * @type get
 * @url /reportes
 */
router.get('/reportes', reporteController.reportes);

//router.get('/administracion/katty', dependenciaController.verDependencia);
module.exports = router;