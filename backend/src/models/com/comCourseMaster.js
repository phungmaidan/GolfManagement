export default function (sequelize, DataTypes) {
  return sequelize.define('ComCourseMaster', {
    courseId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'CourseID'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Name'
    },
    blueFront9CourseRate: {
      type: DataTypes.REAL,
      allowNull: true,
      field: 'BlueFront9CourseRate'
    },
    blueBack9CourseRate: {
      type: DataTypes.REAL,
      allowNull: true,
      field: 'BlueBack9CourseRate'
    },
    whiteFront9CourseRate: {
      type: DataTypes.REAL,
      allowNull: true,
      field: 'WhiteFront9CourseRate'
    },
    whiteBack9CourseRate: {
      type: DataTypes.REAL,
      allowNull: true,
      field: 'WhiteBack9CourseRate'
    },
    redFront9CourseRate: {
      type: DataTypes.REAL,
      allowNull: true,
      field: 'RedFront9CourseRate'
    },
    redBack9CourseRate: {
      type: DataTypes.REAL,
      allowNull: true,
      field: 'RedBack9CourseRate'
    },
    blueSlopeRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'BlueSlopeRate'
    },
    whiteSlopeRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'WhiteSlopeRate'
    },
    redSlopeRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'RedSlopeRate'
    },
    divisionId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'DivisionID'
    },
    blackFront9CourseRate: {
      type: DataTypes.REAL,
      allowNull: true,
      field: 'BlackFront9CourseRate'
    },
    blackBack9CourseRate: {
      type: DataTypes.REAL,
      allowNull: true,
      field: 'BlackBack9CourseRate'
    },
    blackSlopeRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'BlackSlopeRate'
    },
    picture: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Picture'
    },
    goldFront9CourseRate: {
      type: DataTypes.REAL,
      allowNull: true,
      field: 'GoldFront9CourseRate'
    },
    goldBack9CourseRate: {
      type: DataTypes.REAL,
      allowNull: true,
      field: 'GoldBack9CourseRate'
    },
    goldSlopeRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'GoldSlopeRate'
    },
    homeCourse: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'HomeCourse'
    },
    apacPrefix: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'ApacPrefix'
    },
    apacCounter: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'ApacCounter'
    },
    defaultValue: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'DefaultValue'
    },
    maleSlopeRate: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'MaleSlopeRate'
    },
    femaleSlopeRate: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'FemaleSlopeRate'
    },
    openCourse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'OpenCourse'
    }
  }, {
    sequelize,
    tableName: 'ComCourseMaster',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_ComCourseMaster',
        unique: true,
        fields: [
          { name: 'CourseID' }
        ]
      }
    ]
  })
}
