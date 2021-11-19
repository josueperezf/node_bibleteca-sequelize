'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Estado.hasMany(models.Copia, {
        as: 'copias',
        foreignKey: 'estado_id',
      });
    }
  };
  Estado.init({
    nombre: DataTypes.STRING(80),
    estatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Estado',
    freezeTableName: true,
    tableName: 'estados',
    timestamps: false
  });
  Estado.addScope('activo', {where: {estatus:1}});
  return Estado;
};