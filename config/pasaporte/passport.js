//load bcrypt
var bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');

module.exports = function (passport, Cuenta, Persona, Rol) {
    var LocalStrategy = require('passport-local').Strategy;
    //serialize
    passport.serializeUser(function (user, done) {
        done(null, user.idCuenta);
    });
    // deserialize user 
    passport.deserializeUser(function (idCuenta, done) {
        Cuenta.findById(idCuenta).then(function (cuenta) {
            if (cuenta) {
                done(null, cuenta.get());
            } else {
                done(cuenta.errors, null);
            }
        });
    });
    //registro de usuarios por passport
    passport.use('local-signup', new LocalStrategy(
            {
                usernameField: 'correo',
                passwordField: 'clave',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, correo, clave, done) {
                var generateHash = function (password) {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
                };
                //verificar si el email no esta registrado
                Cuenta.findOne({
                    where: {
                        cedula: correo
                    }
                }).then(function (cuenta) {
                    if (cuenta)
                    {
                        return done(null, false, {
                            message: req.flash('correo_repetido', 'El correo ya esta regisrado')
                        });

                    } else
                    {
                        var userPassword = generateHash(clave);
                        Rol.findOne({
                            where: {nombre: 'usuario'}
                        }).then(function (rol) {
                            if (rol) {
                                var dataCuenta =
                                        {
                                            cedula: req.body.cedula,
                                            clave: userPassword
                                        };
                                Cuenta.create(dataCuenta).then(function (newCuenta, created) {
                                    if (!newCuenta) {

                                        return done(null, false);
                                    }
                                    if (newCuenta) {
                                        console.log("Se ha creado la cuenta: " + newCuenta.idCuenta);
                                        var dataPersona = {
                                            nombre: req.body.nombre,
                                            apellido: req.body.apellido,
                                            email: req.body.correo,
                                            telefono: req.body.telefono,
                                            idRol: rol.idRol,
                                            idCuenta: newCuenta.idCuenta
                                        };
                                        Persona.create(dataPersona).then(function (newPersona, created) {
                                            if (newPersona) {
                                                console.log("Se ha creado la persona: " + newPersona.idPersona);
                                                return done(null, newPersona);
                                            }
                                            if (!newPersona) {
                                                console.log("Persona no se pudo crear");
                                                //borrar persona
                                                return done(null, false);
                                            }

                                        });

                                    }
                                });
                            } else {
                                return done(null, false, {
                                    message: 'El rol no existe'
                                });
                            }
                        });

                    }
                });
            }
    ));


//inicio de sesion
    passport.use('local-signin', new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'correo',
                passwordField: 'clave',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, cedula, password, done) {
                var isValidPassword = function (userpass, password) {
                    return bCrypt.compareSync(password, userpass);
                }
                Cuenta.findOne({where: {cedula: cedula}}).then(function (cuenta) {
                    if (!cuenta) {
                        return done(null, false, {message: req.flash('err_cred', 'Cuenta no existe')});
                    }

                    if (!isValidPassword(cuenta.clave, password)) {
                        return done(null, false, {message: req.flash('err_cred', 'Clave incorrecta')});
                    }

                    var userinfo = cuenta.get();
                    console.log("Este es el id = "+userinfo.idCuenta);
                    req.session.id=userinfo.idCuenta;
                    return done(null, userinfo);

                }).catch(function (err) {
                    console.log("Error:", err);
                    return done(null, false, {message: req.flash('err_cred', 'Cuenta erronea')});
                });
            }
    ));

}


