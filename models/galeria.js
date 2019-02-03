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
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    },{timestamps: false,
        freezeTableName: true
    });
    
    Galeria.belongsTo(Dependencia, {
        foreignKey: 'id_galeria',
        constraints: false
    });

    return Galeria;
};
