export default function (sequelize, DataTypes) {
  return sequelize.define('ComGuest', {
    guestId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'GuestID'
    },
    dateChanged: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DateChanged'
    },
    userId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'UserID'
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'FullName'
    },
    salutation: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Salutation'
    },
    cardNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CardNumber'
    },
    companyName: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'CompanyName'
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'BirthDate'
    },
    identityCard: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'IdentityCard'
    },
    passport: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Passport'
    },
    nationality: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Nationality'
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Gender'
    },
    maritalStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'MaritalStatus'
    },
    occupation: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Occupation'
    },
    address1: {
      type: DataTypes.STRING(350),
      allowNull: true,
      field: 'Address1'
    },
    address2: {
      type: DataTypes.STRING(350),
      allowNull: true,
      field: 'Address2'
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'City'
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'State'
    },
    postCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PostCode'
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Country'
    },
    contact1: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Contact1'
    },
    contact2: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Contact2'
    },
    fax1: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Fax1'
    },
    fax2: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Fax2'
    },
    email1: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Email1'
    },
    email2: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Email2'
    },
    creditCardNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CreditCardNumber'
    },
    cardExpiry: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'CardExpiry'
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Status'
    },
    remarks: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'Remarks'
    },
    guestType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'GuestType'
    },
    handicap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'Handicap'
    },
    carNumber: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'CarNumber'
    },
    taxCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'TaxCode'
    },
    race: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Race'
    }
  }, {
    sequelize,
    tableName: 'ComGuest',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: 'PK_ComGuest_1',
        unique: true,
        fields: [
          { name: 'GuestID' }
        ]
      }
    ]
  })
}
