'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CopiaPrestamo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CopiaPrestamo.init({
    copia_id: {
      type: DataTypes.INTEGER,
      references: 'copias',
      referencesKey: 'id'
    },
    prestamo_id: {
      type: DataTypes.INTEGER,
      references: 'prestamos',
      referencesKey: 'id'
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'CopiaPrestamo',
    freezeTableName: true,
    tableName: 'copias_prestamos',
    timestamps: false
  });
  return CopiaPrestamo;
};