module.exports = function (sequelize, Sequelize) {
    var dependencia = require('../models/dependencia');
    var Dependencia = new dependencia(sequelize, Sequelize);
    var Galeria = sequelize.define('galeria', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        foto: {
            type: Sequelize.STRING(50)
        },
        external_id: {
            type: Sequelize.UUID
        }

    },{timestamps: false,
        freezeTableName: true
    });
    
    Galeria.belongsTo(Dependencia, {
        foreignKey: 'id_dependencia',
        constraints: false
    });

    return Galeria;
};
