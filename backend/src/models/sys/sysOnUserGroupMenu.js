export default function (sequelize, DataTypes) {
  return sequelize.define('SysOnUserGroupMenu', {
    groupId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'GroupID'
    },
    itemId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'ItemID'
    },
    save: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'Save'
    },
    edit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'Edit'
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'Delete'
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'Level'
    }
  }, {
    sequelize,
    tableName: 'SysOnUserGroupMenu',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_sysUserGroupMenu",
        unique: true,
        fields: [
          { name: "GroupID" },
          { name: "ItemID" },
        ]
      },
    ]
  });
};
