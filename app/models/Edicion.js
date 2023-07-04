'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Edicion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Edicion.belongsTo(models.Idioma, {
        as: 'idioma',
        foreignKey:'idioma_id',
      });

      Edicion.belongsTo(models.Libro, {
        as: 'libro',
        foreignKey:'libro_id',
      });

      Edicion.hasMany(models.Copia, {
        as: 'copias',
        foreignKey: 'edicion_id',
      });
    }
  };
  Edicion.init({
    idioma_id: {
      type: DataTypes.INTEGER,
      references: 'idiomas',
      referencesKey: 'id'
    },
    autor_id: {
      type: DataTypes.INTEGER,
      references: 'autores',
      referencesKey: 'id'
    },
    libro_id: {
      type: DataTypes.INTEGER,
      references: 'libros',
      referencesKey: 'id'
    },
    nombre: {
      type: DataTypes.STRING(100)
    },
    fecha: {
      type: DataTypes.DATE
    },
    isbn: {
      type: DataTypes.STRING(100)
    },
    numero_paginas: {
      type: DataTypes.INTEGER
    },
    tipo: {
      type: DataTypes.CHAR(1)
    },
    estatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.fn('NOW'),
      allowNull: false
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.fn('NOW'),
        allowNull: false
    },
  }, {
    scopes: {
      buscar(value) {
        return {
            where: {
              [Op.or]: [
                  {nombre: {[Op.like]: `%${value}%`}},
                  {isbn: {[Op.like]: `%${value}%`}},
              ]
            },
          }
        }
    },
    sequelize,
    modelName: 'Edicion',
    tableName: 'ediciones',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Edicion.addScope('activo', {where: {estatus:1}});
  return Edicion;
};