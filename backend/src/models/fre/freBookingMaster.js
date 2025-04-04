export default function (sequelize, DataTypes) {
  return sequelize.define('FreBookingMaster', {
    bookingId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'BookingID'
    },
    entryDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'EntryDate'
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'BookingDate'
    },
    courseId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CourseID'
    },
    session: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Session'
    },
    teeBox: {
      type: DataTypes.STRING(5),
      allowNull: false,
      field: 'TeeBox'
    },
    hole: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: 'Hole'
    },
    flight: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: 'Flight'
    },
    teeTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'TeeTime'
    },
    guestType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'GuestType'
    },
    memberNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'MemberNo'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Name'
    },
    contactNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ContactNo'
    },
    pax: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      field: 'Pax'
    },
    remark: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Remark'
    },
    recordStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'RecordStatus'
    },
    userId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'UserID'
    },
    authorisedBy: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'AuthorisedBy'
    },
    cancelledDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CancelledDate'
    },
    cancelledId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CancelledID'
    },
    cancelledReason: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'CancelledReason'
    },
    cancelledUserId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CancelledUserID'
    },
    contactPerson: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ContactPerson'
    },
    fax: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Fax'
    },
    creditCardNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CreditCardNumber'
    },
    creditCardExpiry: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CreditCardExpiry'
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Email'
    },
    groupId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'GroupID'
    },
    groupName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'GroupName'
    },
    salesPerson: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'SalesPerson'
    },
    referenceId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ReferenceID'
    }
  }, {
    sequelize,
    tableName: 'FreBookingMaster',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'IX_FreBookingMaster',
        fields: [
          { name: 'BookingID' },
          { name: 'BookingDate' },
          { name: 'RecordStatus' },
          { name: 'Session' }
        ]
      },
      {
        name: 'PK_FreBookingMaster',
        unique: true,
        fields: [
          { name: 'BookingID' }
        ]
      }
    ]
  })
}
