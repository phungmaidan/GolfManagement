export default function(sequelize, DataTypes) {
  return sequelize.define('ComCourseDetail', {
    mid: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      field: 'MID'
    },
    holeNo: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      field: 'HoleNo'
    },
    par: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: 'Par'
    },
    index: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: 'Index'
    }
  }, {
    sequelize,
    tableName: 'ComCourseDetails',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_ComCourseDetails',
        unique: true,
        fields: [
          { name: 'MID' },
          { name: 'HoleNo' }
        ]
      }
    ]
  })
}
