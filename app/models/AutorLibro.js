'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AutorLibro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AutorLibro.init({
    libro_id: {
      type: DataTypes.INTEGER,
      references: 'libros',
      referencesKey: 'id'
    },
    autor_id: {
      type: DataTypes.INTEGER,
      references: 'autores',
      referencesKey: 'id'
    },
  }, {
    sequelize,
    modelName: 'AutorLibro',
    freezeTableName: true,
    tableName: 'autores_libros',
    timestamps: false
  });
  return AutorLibro;
};