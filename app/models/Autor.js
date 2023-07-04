'use strict';
const {
  Model, Op
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

      /** SCOPES */
      this.addScope('buscar', (value) => (
        {
            where: {
                [Op.or]: [
                    {nombre: {[Op.like]: `%${value}%`}},
                    {'$pais.nombre$': {[Op.like]: `%${value}%`}},
                ],
            },
            include: [
                {model: models.Pais, as: 'pais'}
            ],
        })
      );
      
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
      type: DataTypes.DATEONLY, // DATEONLY es fecha, date es timestamp, 
      validate: {
        isDate: {
          args: true,
          msg: 'La fecha de nacimiento es obligatoria'
        }
      }
    },
    biografia: {
     type: DataTypes.TEXT
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
    sequelize,
    modelName: 'Autor',
    tableName: 'autores',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Autor;
};