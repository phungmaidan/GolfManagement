export default function (sequelize, DataTypes) {
  return sequelize.define('FreTemplateDetails', {
    templateId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'TemplateID'
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
    flight: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      field: 'Flight'
    },
    teeTime: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      field: 'TeeTime'
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Status'
    },
    barrel: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'Barrel'
    }
  }, {
    sequelize,
    tableName: 'FreTemplateDetails',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_FreTemplateDetails',
        unique: true,
        fields: [
          { name: 'TemplateID' },
          { name: 'Session' },
          { name: 'TeeBox' },
          { name: 'Flight' },
          { name: 'TeeTime' }
        ]
      }
    ]
  })
}
