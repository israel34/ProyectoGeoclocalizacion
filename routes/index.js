var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('principal', { title: 'Geolocalizacion Loja'});
});
router.get('/iniciar_sesion', function(req, res, next) {
  res.render('iniciarSesion', { title: 'Inicia Sesion'});
});
router.get('/registrar', function(req, res, next) {
  res.render('registrar', { title: 'Registrate'});
});
router.post('/guardar',
        passport.authenticate('local-signup', {successRedirect: '/inicio_sesion',
            failureRedirect: '/registrar', failureFlash: true}
        ));
router.post('/iniciar',
        passport.authenticate('local-signin',
                {successRedirect: '/administracion',
                    failureRedirect: '/inicio_sesion',
                    failureFlash: true}
        ));

module.exports = router;
