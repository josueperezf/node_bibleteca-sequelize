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

      Persona.hasMany(models.Prestamo, {
        as: 'prestamos',
        foreignKey: 'persona_id',
      });
      Persona.hasOne(models.Usuario, {
        as: 'usuario',
        foreignKey:'persona_id',
      });

      /**SCOPE */
      // Persona.addScope('autores', ({value, order, limit, offset} ) => ({
      //   include: [
      //       {
      //           model: models.Autor, as: 'autor', 
      //           where: {
      //               persona_id: {[Op.not]: null}, 
      //               [Op.or]: [
      //                 {'dni': {[Op.like]: `%${value}%`}},
      //                 {'nombre': {[Op.like]: `%${value}%`}},
      //             ],
      //           }
      //       }
      //   ],
      // }));
    }
  };
  Persona.init({
    dni: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(100),
    },
    direccion: {
      type: DataTypes.STRING(200)
    },
    telefono: {
      type: DataTypes.STRING(12)
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          args: true,
          msg: 'La fecha de nacimiento es obligatoria'
        }
      }
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
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Persona;
};
