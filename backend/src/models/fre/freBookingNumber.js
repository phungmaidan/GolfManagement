export default function (sequelize, DataTypes) {
  return sequelize.define('FreBookingNumber', {
    id: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    counter: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'Counter'
    }
  }, {
    sequelize,
    tableName: 'FreBookingNumber',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_FreBookingNumber",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
