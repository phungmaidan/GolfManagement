export default function (sequelize, DataTypes) {
  return sequelize.define('FreTeeTimeDetails', {
    courseId: {
      type: DataTypes.STRING(50),
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
    session: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'Session'
    },
    flight: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: 'Flight'
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      field: 'Status'
    },
    squeenze: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'Squeenze'
    }
  }, {
    sequelize,
    tableName: 'FreTeeTimeDetails',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_FreTeeTimeDetails',
        unique: true,
        fields: [
          { name: 'CourseID' },
          { name: 'TxnDate' },
          { name: 'TeeBox' },
          { name: 'TeeTime' }
        ]
      }
    ]
  })
}
