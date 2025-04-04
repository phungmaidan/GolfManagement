export default function (sequelize, DataTypes) {
  return sequelize.define('FreTeeTimeMaster', {
    courseId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'CourseID'
    },
    templateId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'TemplateID'
    },
    txnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      field: 'TxnDate'
    },
    userId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'UserID'
    }
  }, {
    sequelize,
    tableName: 'FreTeeTimeMaster',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_FreTeeTimeMaster',
        unique: true,
        fields: [
          { name: 'CourseID' },
          { name: 'TemplateID' },
          { name: 'TxnDate' }
        ]
      }
    ]
  })
}
