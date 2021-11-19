'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Idioma extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Idioma.hasMany(models.Edicion,  {
        as: 'ediciones',
        foreignKey: 'idioma_id',
      });
    }
  };
  Idioma.init({
    nombre: DataTypes.STRING(100),
    estatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Idioma',
    tableName: 'idiomas',
    timestamps: false,
    freezeTableName: true,
  });
  Idioma.addScope('activo', {where: {estatus:1}});
  return Idioma;
};