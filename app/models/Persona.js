'use strict';
const {
  Model, Op
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log({models});
      // define association here
      Persona.belongsTo(models.Pais, {
        as: 'pais',
        foreignKey:'pais_id',
      });

      Persona.hasOne(models.Autor, {
        as: 'autor',
        foreignKey:'persona_id',
      });

      Persona.hasMany(models.Prestamo, {
        as: 'prestamos',
        foreignKey: 'persona_id',
      });
      Persona.hasOne(models.Usuario, {
        as: 'usuario',
        foreignKey:'persona_id',
      });

      /**SCOPE */
      Persona.addScope('autores', ({value, order, limit, offset} ) => ({
        include: [
            {
                model: models.Autor, as: 'autor', 
                where: {
                    persona_id: {[Op.not]: null}, 
                    [Op.or]: [
                      {'dni': {[Op.like]: `%${value}%`}},
                      {'nombre': {[Op.like]: `%${value}%`}},
                  ],
                }
            }
        ],
      }));
    }
  };
  Persona.init({
    pais_id: {
      type: DataTypes.INTEGER,
      references: 'paises',
      referencesKey: 'id'
    },
    dni: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(100),
      validate: {
        isAlpha: {
          args: true,
          msg: 'El nombre solo puede contener letras'
        },
        len: {
          args: [3, 100],
          msg: 'El nombre debe contener entre 3 y 255  caracteres'
        }
      }
    },
    direccion: {
      type: DataTypes.STRING(200)
    },
    telefono: {
      type: DataTypes.STRING(12)
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
    estatus: {
      type: DataTypes.INTEGER
    }
  }, {
    scopes: {
      buscar(value) {
        return {
          where: {
            [Op.or]: [
                {dni: {[Op.like]: `%${value}%`}},
                {nombre: {[Op.like]: `%${value}%`}},
                {direccion: {[Op.like]: `%${value}%`}},
                {telefono: {[Op.like]: `%${value}%`}},
            ]
  
          },
        }
      },
    },
    sequelize,
    modelName: 'Persona',
    tableName: 'personas',
    timestamps: false,
  });

  return Persona;
};
