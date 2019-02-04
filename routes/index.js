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
router.get('/administracion', function(req, res, next) {
  res.render('administracion', { title: 'Inicia Sesion'});
});
/*router.post('/registrar', function(req, res, next){
        passport.authenticate('local-signup', {
                successRedirect: '/administracion',
                failureRedirect: '/administracion', 
                failureFlash: true
            }
        )(req, res, next);
    });*/


router.post('/registrar', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
        console.log("authenticate");
        console.log(err);
        console.log(user);
        console.log(info);
        res.redirect('/iniciar_sesion');
    })(req, res, next);
    });


/*router.post('/iniciar',
        passport.authenticate('local-signin',
                {successRedirect: '/administracion',
                    failureRedirect: '/iniciar_sesion',
                    failureFlash: true}
        ));*/

router.post('/iniciar', function(req, res, next) {
    console.log("Login  prueba");
    passport.authenticate('local-signin', function(err, user, info) {
        console.log("authenticate login");
        console.log(err);
        console.log(user);
        console.log(info);
        res.redirect('/administracion');
    })(req, res, next);
    });

module.exports = router;
