'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EstatusPrestamo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EstatusPrestamo.hasMany(models.Prestamo, {
        as: 'prestamos',
        foreignKey: 'estatus_prestamo_id',
      });
    }
  };
  EstatusPrestamo.init({
    nombre: DataTypes.STRING(50),
    estatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'EstatusPrestamo',
    freezeTableName: true,
    tableName: 'estatus_prestamos',
    timestamps: false
  });
  EstatusPrestamo.addScope('activo', {where: {estatus:1}});
  return EstatusPrestamo;
};