export default function (sequelize, DataTypes) {
  return sequelize.define('ComGuestAccount', {
    GuestID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    PasswordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Salt: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AccountStatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    DisplayName: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ComGuestAccount',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_ComGuestAccount',
        unique: true,
        fields: [
          { name: 'GuestID' }
        ]
      }
    ]
  })
}