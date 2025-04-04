export default function (sequelize, DataTypes) {
  return sequelize.define('SysOnParameter', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Description'
    },
    value: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Value'
    }
  }, {
    sequelize,
    tableName: 'SysOnParameter',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_SysOnParameter',
        unique: true,
        fields: [
          { name: 'ID' }
        ]
      }
    ]
  })
}
