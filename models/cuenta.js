module.exports = function (sequelize, Sequelize) {
    var persona = require('../models/persona');
    var Persona = new persona(sequelize, Sequelize);
    var Cuenta = sequelize.define('cuenta', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        }, 
        correo: {
            type: Sequelize.STRING(50)
        },
        clave: {
            type: Sequelize.STRING
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
        
    }, {timestamps: false,
        freezeTableName: true
    });
    
    Cuenta.belongsTo(Persona, {
        foreignKey: 'id_persona',
        constraints: false
    });
    
    return Cuenta;
};

