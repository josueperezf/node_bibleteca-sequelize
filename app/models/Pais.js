'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pais.hasMany(models.Autor, {
        as: 'autor',
        foreignKey: 'pais_id',
      });
    }
  };
  Pais.init({
    nombre: DataTypes.STRING(50),
    estatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Pais',
    freezeTableName: true,
    tableName: 'paises',
    timestamps: false
  });
  Pais.addScope('activo', {where: {estatus:1}});
  return Pais;
};