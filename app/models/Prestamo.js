'use strict';
const {
  Model, Op
} = require('sequelize');
const Copia = require('./Copia');
const Persona = require('./Persona');

module.exports = (sequelize, DataTypes) => {
  class Prestamo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prestamo.belongsTo(models.Persona, {
        as: 'persona',
        foreignKey:'persona_id',
      });

      Prestamo.belongsToMany(models.Copia, { through: models.CopiaPrestamo, as: 'copias', foreignKey: 'prestamo_id' });

      Prestamo.belongsTo(models.EstatusPrestamo, {
        as: 'estado',
        foreignKey: 'estatus_prestamo_id',
      });

      /** scopes */
      Prestamo.addScope('buscar', ({value, order, limit, offset} ) => (
        {
            where: {
                [Op.or]: [
                    {'$copias.codigo$': {[Op.like]: `%${value}%`}},
                    {'$copias.serial$': {[Op.like]: `%${value}%`}},
                    {'$persona.dni$': {[Op.like]: `%${value}%`}},
                ],
                
            },
            subQuery: false,
            limit,
            offset,
            order,
            include: [
                {model: models.Copia, as: 'copias'},
                {model: models.Persona, as: 'persona'}
            ],
        })
      );
    }
  };
  Prestamo.init({
    estatus_prestamo_id: {
      type: DataTypes.INTEGER,
      references: 'estatus_prestamos',
      referencesKey: 'id',
    },
    persona_id: {
      type: DataTypes.INTEGER,
      references: 'personas',
      referencesKey: 'id',
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
    modelName: 'Prestamo',
    tableName: 'prestamos',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Prestamo;
};