export default function (sequelize, DataTypes) {
  return sequelize.define('SysOnModule', {
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
    },
    pictureKey: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'PictureKey'
    }
  }, {
    sequelize,
    tableName: 'SysOnModule',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_sysModule",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
