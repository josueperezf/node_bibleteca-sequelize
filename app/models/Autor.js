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
      Autor.belongsTo(models.Pais, {
        as: 'pais',
        foreignKey:'pais_id',
      });

      Autor.belongsToMany(models.Libro, { through: models.AutorLibro, as: 'libros', foreignKey:'autor_id' });
    }
  };
  Autor.init({
    pais_id: {
      type: DataTypes.INTEGER,
      references: 'paises',
      referencesKey: 'id'
    },
    nombre: {
      type: DataTypes.STRING(100),
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'La fecha de nacimiento es obligatoria'
        }
      }
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