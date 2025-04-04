export default function (sequelize, DataTypes) {
  return sequelize.define('FreBlockBooking', {
    courseId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'CourseID'
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      field: 'TransactionDate'
    },
    session: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'Session'
    },
    teeBox: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      field: 'TeeBox'
    },
    teeTime: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      field: 'TeeTime'
    },
    entryTime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'EntryTime'
    },
    flight: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: 'Flight'
    },
    remark: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Remark'
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'UserID'
    },
    recordStatus: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'RecordStatus'
    },
    creditCardNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CreditCardNumber'
    },
    contactPerson: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'ContactPerson'
    },
    contactNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ContactNo'
    },
    fax: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Fax'
    },
    color: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'Color'
    }
  }, {
    sequelize,
    tableName: 'FreBlockBooking',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_FreBlockBooking',
        unique: true,
        fields: [
          { name: 'CourseID' },
          { name: 'TransactionDate' },
          { name: 'Session' },
          { name: 'TeeBox' },
          { name: 'TeeTime' },
          { name: 'EntryTime' }
        ]
      }
    ]
  })
}
