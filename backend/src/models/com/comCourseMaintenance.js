export default function (sequelize, DataTypes) {
  return sequelize.define('ComCourseMaintenance', {
    courseId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'CourseID'
    },
    txnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      field: 'TxnDate'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'Active'
    }
  }, {
    sequelize,
    tableName: 'ComCourseMaintenance',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_ComCourseMaintenance',
        unique: true,
        fields: [
          { name: 'CourseID' },
          { name: 'TxnDate' }
        ]
      }
    ]
  })
}
