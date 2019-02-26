var bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');
var models = require('../../models/ind');
var Rol = models.rol;
var Cuenta = models.cuenta;
var Persona = models.persona;
var insert_admin = function () {
    Persona.findOrCreate({where: {id_rol: '1'}, defaults: {
            nombre: 'admin',
            id: '1',
            apellido: 'admin',
            telefono: '0997317410',
            job: '1'
        }}).spread((user, persona) => {
        var clave = bCrypt.hashSync('123', bCrypt.genSaltSync(8), null);
        Cuenta.findOrCreate({where: {id_persona: '1'}, defaults: {
                correo: 'admin@gmail.com', 
                id: '1',
                clave: clave, 
                job: '1'
            }}).spread((user_cuenta, cuenta) => {
            console.log("Se inserto persona y cuenta del admin");
        });
    });
};
module.exports = insert_admin();
