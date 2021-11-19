'use strict';
const {
  Model,
  Op
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.belongsTo(models.Persona, {
        as: 'persona',
        foreignKey:'persona_id',
      });

      Usuario.belongsTo(models.TipoUsuario, {
        as: 'tipo_usuario',
        foreignKey:'tipo_usuario_id',
      } );


      /** SCOPE */
      Usuario.addScope('buscar', ({value, order, limit, offset} ) => (
        {
            where: {
                [Op.or]: [
                    {'$usuario.login$': {[Op.like]: `%${value}%`}},
                    {'$persona.dni$': {[Op.like]: `%${value}%`}},
                    {'$persona.nombre$': {[Op.like]: `%${value}%`}},
                ],
                
            },
            subQuery: false,
            limit,
            offset,
            order,
            include: [
                {model: models.Persona, as: 'persona'}
            ],
        })
      );
    }
  };
  Usuario.init({
    tipo_usuario_id: {
      type: DataTypes.INTEGER,
      references: 'tipo_usuarios',
      isNumeric: true,
      referencesKey: 'id',
      defaultValue: 2,
    },
    persona_id: {
      type: DataTypes.INTEGER,
      references: 'personas',
      referencesKey: 'id',
      unique: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: false,
    underscored: true
  });
  // con la siguiente linea oculto el password, para no enviar ni siquiera la propiedad password por seguridad
  Usuario.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
  return Usuario;
};