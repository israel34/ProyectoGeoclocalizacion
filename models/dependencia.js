module.exports = function (sequelize, Sequelize) {
    var categoria = require('../models/categoria');
    var Categoria = new categoria(sequelize, Sequelize);
    var Dependencia = sequelize.define('dependencia', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING(50)
        },
        descripcion: {
            type: Sequelize.STRING
        }, 
        telefono: {
            type: Sequelize.STRING(15)
        },
        horarioAtencion: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        external_id: {
            type: Sequelize.UUID
        }
        
    },{timestamps: false,
        freezeTableName: true
    });
    Dependencia.associate = function (models) {
        models.dependencia.hasMany(models.puntuacion, {
            foreignKey: 'id_dependencia'
        });
        models.dependencia.hasMany(models.galeria, {
            foreignKey: 'id_dependencia'
        });
    }   
   
    Dependencia.belongsTo(Categoria, {
        foreignKey: 'id_categoria',
        constraints: false
    });
    
    
    return Dependencia;
};


