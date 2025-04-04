export default function (sequelize, DataTypes) {
  return sequelize.define('MrmCommonCode', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'Description'
    },
    remarks: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Remarks'
    },
    remarks1: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Remarks1'
    },
    remarks2: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Remarks2'
    },
    remarks3: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Remarks3'
    },
    remarks4: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Remarks4'
    }
  }, {
    sequelize,
    tableName: 'mrmCommonCode',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_mrmCommonCode",
        unique: true,
        fields: [
          { name: "ID" },
          { name: "Description" },
        ]
      },
    ]
  });
};
