module.exports = function (sequelize, Sequelize) {
    var dependencia = require('../models/dependencia');
    var Dependencia = new dependencia(sequelize, Sequelize);
    var persona = require('../models/persona');
    var Persona = new persona(sequelize, Sequelize);
    var Puntuacion = sequelize.define('puntuacion', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        ranKing: {
            type: Sequelize.STRING(50)
        },
        comentario: {
            type: Sequelize.STRING
        },
        external_id: {
            type: Sequelize.UUID
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
        
    },{timestamps: false,
        freezeTableName: true
    });
    
    Puntuacion.belongsTo(Persona, {
        foreignKey: 'id_persona',
        constraints: false
        
    });
    
    Puntuacion.belongsTo(Dependencia, {
        foreignKey: 'id_dependencia',
        constraints: false
    });
    
    Puntuacion.associate = function (models) {
        models.puntuacion.hasOne(models.dependencia, {
            foreignKey: 'id_persona'
        });
    }
    
    return Puntuacion;
};



