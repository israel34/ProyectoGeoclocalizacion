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
        }
        
    },{timestamps: false,
        freezeTableName: true
    });
    
    Puntuacion.belongsTo(Persona, {
        foreignKey: 'id_persona'
        
    });
    
    Puntuacion.belongsTo(Dependencia, {
        foreignKey: 'id_dependencia'
    });
    
    
    
    return Puntuacion;
};



