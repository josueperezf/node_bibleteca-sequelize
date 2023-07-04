'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Libro.belongsToMany(models.Autor, { through: models.AutorLibro, as: 'autores', foreignKey: 'libro_id' });
      Libro.hasMany(models.Edicion,  {
        as: 'ediciones',
        foreignKey: 'libro_id',
      });
    }
  };
  Libro.init({
    titulo: {
      type: DataTypes.STRING(200),
    },
    estatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
  }, {
    scopes: {
        buscar(value) {
          return {
            where: {
              [Op.or]: [
                  {titulo: {[Op.like]: `%${value}%`}},
              ]
            },
          }}
    },
    sequelize,
    modelName: 'Libro',
    freezeTableName: true,
    tableName: 'libros',
    timestamps: false,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Libro.addScope('activo', {where: {estatus:1}});
  return Libro;
};