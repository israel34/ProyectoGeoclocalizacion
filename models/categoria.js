module.exports = function (sequelize, Sequelize) {
    var Categoria = sequelize.define('categoria', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
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

    Categoria.associate = function (models) {
        models.categoria.hasMany(models.dependencia, {
            foreignKey: 'id_categoria'
        });
    };

    return Categoria;
};
