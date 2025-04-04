export default function (sequelize, DataTypes) {
  return sequelize.define('ComGuestType', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Description'
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Type'
    },
    guestGroup: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'GuestGroup'
    },
    mainGroup: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'MainGroup'
    },
    showInPayment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'ShowInPayment'
    },
    advanceBooking: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'AdvanceBooking'
    },
    color: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'Color'
    },
    linkToMembership: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'LinkToMembership'
    },
    linkToHotel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'LinkToHotel'
    },
    tax1: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'Tax1'
    },
    tax2: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'Tax2'
    },
    tax3: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'Tax3'
    },
    tax4: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'Tax4'
    },
    requireKeyboard: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'RequireKeyboard'
    },
    defaultDiscountTemplate: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'DefaultDiscountTemplate'
    },
    defaultGuest: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'DefaultGuest'
    },
    linkToVisitor: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'LinkToVisitor'
    },
    invoice: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'Invoice'
    }
  }, {
    sequelize,
    tableName: 'ComGuestType',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_ComGuestType',
        unique: true,
        fields: [
          { name: 'ID' }
        ]
      }
    ]
  })
}
