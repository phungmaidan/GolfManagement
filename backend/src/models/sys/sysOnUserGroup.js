export default function (sequelize, DataTypes) {
  return sequelize.define('SysOnUserGroup', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Name'
    },
    adminUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'AdminUser'
    }
  }, {
    sequelize,
    tableName: 'SysOnUserGroup',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_sysUserGroup",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
