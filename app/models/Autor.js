'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Autor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Autor.belongsTo(models.Persona, {
        as: 'persona',
        foreignKey:'persona_id',
      });

      Autor.belongsToMany(models.Libro, { through: models.AutorLibro, as: 'libros', foreignKey:'autor_id' });
    }
  };
  Autor.init({
    persona_id: {
      type: DataTypes.INTEGER,
      references: 'personas',
      referencesKey: 'id'
    },
    biografia: DataTypes.TEXT,
    estatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Autor',
    freezeTableName: true,
    tableName: 'autores',
    timestamps: false
  });
  return Autor;
};