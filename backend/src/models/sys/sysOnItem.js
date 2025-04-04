export default function (sequelize, DataTypes) {
  return sequelize.define('SysOnItem', {
    id: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Name'
    },
    optionType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'OptionType'
    },
    moduleId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'ModuleID'
    },
    subMenu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'SubMenu'
    },
    primaryItemId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PrimaryItemID'
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'Sequence'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'Active'
    }
  }, {
    sequelize,
    tableName: 'SysOnItem',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'IX_SysItems',
        fields: [
          { name: 'OptionType' },
          { name: 'ModuleID' }
        ]
      },
      {
        name: 'PK_SysItems',
        unique: true,
        fields: [
          { name: 'ID' }
        ]
      }
    ]
  })
}
