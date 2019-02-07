var models = require('../../models/ind');
var Rol = models.rol;
var insert_rol = function () {
    Rol.findOrCreate({where: {nombre: 'administrador'}, defaults: { id: '1', job: 'administrador'}}).spread((user, created) => {
        console.log(user.get({
            plain: true
        }));
    });
    Rol.findOrCreate({where: {nombre: 'usuario'}, defaults: {id: '2', job: 'usuario'}}).spread((user, created) => {
        console.log(user.get({
            plain: true
        }));
    });
};

module.exports = insert_rol();
