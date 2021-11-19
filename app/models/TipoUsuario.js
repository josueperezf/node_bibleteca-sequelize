'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TipoUsuario.hasMany(models.Usuario,  {
        as: 'usuarios',
        foreignKey: 'tipo_usuario_id',
      });
    }
  };
  TipoUsuario.init({
    nombre: DataTypes.STRING(100),
    estatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1
  }
  }, {
    sequelize,
    modelName: 'TipoUsuario',
    freezeTableName: true,
    tableName: 'tipo_usuarios',
    timestamps: false
  });
  TipoUsuario.addScope('activo', {where: {estatus:1}});
  return TipoUsuario;
};