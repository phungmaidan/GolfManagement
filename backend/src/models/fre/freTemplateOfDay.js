export default function (sequelize, DataTypes) {
  return sequelize.define('FreTemplateOfDay', {
    courseId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'CourseID'
    },
    monday: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Monday'
    },
    tuesday: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Tuesday'
    },
    wednesday: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Wednesday'
    },
    thursday: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Thursday'
    },
    friday: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Friday'
    },
    saturday: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Saturday'
    },
    sunday: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Sunday'
    },
    holiday: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Holiday'
    },
    nightGolfing9: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'NightGolfing9'
    },
    nightGolfing18: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'NightGolfing18'
    },
    startBookingDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'StartBookingDate'
    },
    dayAdvanced: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true,
      field: 'DayAdvanced'
    },
    defaultCode: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      field: 'DefaultCode'
    },
    noShowFee: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: true,
      field: 'NoShowFee'
    },
    minPax: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      field: 'MinPax'
    },
    rainCheckExpiryDay: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      field: 'RainCheckExpiryDay'
    },
    allowGreenFeeClaim: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'AllowGreenFeeClaim'
    },
    allowBuggyFeeClaim: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'AllowBuggyFeeClaim'
    },
    allowCaddyFeeClaim: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'AllowCaddyFeeClaim'
    }
  }, {
    sequelize,
    tableName: 'FreTemplateOfDay',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_FreTemplateOfDay',
        unique: true,
        fields: [
          { name: 'CourseID' }
        ]
      }
    ]
  })
}
