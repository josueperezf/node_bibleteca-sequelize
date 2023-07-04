'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Copia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Copia.belongsTo(models.Estado, {
        as: 'estado',
        foreignKey:'estado_id',
      });

      Copia.belongsTo(models.Edicion, {
        as: 'edicion',
        foreignKey:'edicion_id',
      });

      Copia.belongsToMany(models.Prestamo, { through: models.CopiaPrestamo, as: 'prestamos', foreignKey:'copia_id' });

      /** SCOPES */
      this.addScope('buscar', (value) => (
        {
            where: {
                [Op.or]: [
                    {codigo: {[Op.like]: `%${value}%`}},
                    {serial: {[Op.like]: `%${value}%`}},
                    {'$estado.nombre$': {[Op.like]: `%${value}%`}},
                    {'$edicion.nombre$': {[Op.like]: `%${value}%`}},
                ],
            },
            include: [
                {model: models.Estado, as: 'estado'},
                {model: models.Edicion, as: 'edicion'}
            ],
        })
      );
    }
  };
  Copia.init({
    estado_id: {
      type: DataTypes.INTEGER,
      references: 'estados',
      referencesKey: 'id',
      defaultValue: 1
    },
    edicion_id: {
      type: DataTypes.INTEGER,
      references: 'ediciones',
      referencesKey: 'id'
    },
    codigo: {
      type: DataTypes.STRING(50)
    },
    serial: {
      type: DataTypes.STRING(50)
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
    modelName: 'Copia',
    tableName: 'copias',
    timestamps: false,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Copia.addScope('activo', {where: {estado_id:1}});
  return Copia;
};