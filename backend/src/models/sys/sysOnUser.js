export default function (sequelize, DataTypes) {
  return sequelize.define('SysOnUser', {
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
    userGroup: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'UserGroup'
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Password'
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 9,
      field: 'Level'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      field: 'Active'
    },
    formBackColor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'FormBackColor'
    },
    formForeColor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'FormForeColor'
    },
    buttonBackColor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ButtonBackColor'
    },
    buttonForeColor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ButtonForeColor'
    },
    titleBackColor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'TitleBackColor'
    },
    titleForeColor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'TitleForeColor'
    }
  }, {
    sequelize,
    tableName: 'SysOnUser',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'IX_sysUser',
        fields: [
          { name: 'UserGroup' }
        ]
      },
      {
        name: 'PK_sysUser',
        unique: true,
        fields: [
          { name: 'ID' }
        ]
      }
    ]
  })
}
