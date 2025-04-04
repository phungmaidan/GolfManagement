export default function (sequelize, DataTypes) {
  return sequelize.define('MrmPersonalInfo', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    classType: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'ClassType'
    },
    companyName: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'CompanyName'
    },
    companyRegNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CompanyRegNo'
    },
    businessNature: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'BusinessNature'
    },
    dateOfCorporation: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DateOfCorporation'
    },
    placeOfCorporation: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'PlaceOfCorporation'
    },
    paidUpCapital: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true,
      field: 'PaidUpCapital'
    },
    localShareHolding: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true,
      field: 'LocalShareHolding'
    },
    salutation: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'Salutation'
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'FullName'
    },
    shortname: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'Shortname'
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Gender'
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'BirthDate'
    },
    oldIc: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'OldIC'
    },
    newIc: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'NewIC'
    },
    passport: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'Passport'
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'Nationality'
    },
    race: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'Race'
    },
    occupation: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'Occupation'
    },
    maritalStatus: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'MaritalStatus'
    },
    annualIncome: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true,
      field: 'AnnualIncome'
    },
    interestHobbies1: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'InterestHobbies1'
    },
    interestHobbies2: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'InterestHobbies2'
    },
    carNumber1: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CarNumber1'
    },
    carNumber2: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CarNumber2'
    },
    photoPath: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'PhotoPath'
    },
    signaturePath: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'SignaturePath'
    },
    accountHolderFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'AccountHolderFlag'
    },
    membershipFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'MembershipFlag'
    },
    memberNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'MemberNo'
    },
    nominatedBy: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'NominatedBy'
    },
    supplementaryType: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'SupplementaryType'
    },
    salesPerson: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'SalesPerson'
    },
    dateApplied: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DateApplied'
    },
    creditLimit: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true,
      field: 'CreditLimit'
    },
    deposit: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true,
      field: 'Deposit'
    },
    accountStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'AccountStatus'
    },
    statusStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'StatusStartDate'
    },
    statusDueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'StatusDueDate'
    },
    lastYearBalance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'LastYearBalance'
    },
    noFreegame: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'NoFreegame'
    },
    cancelledDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CancelledDate'
    },
    interestFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'InterestFlag'
    },
    creditCardNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CreditCardNumber'
    },
    creditExpiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CreditExpiryDate'
    },
    reminderFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'ReminderFlag'
    },
    reminderStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ReminderStatus'
    },
    waiveGovtTax: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'WaiveGovtTax'
    },
    waiveServChrg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'WaiveServChrg'
    },
    noDiscount: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'NoDiscount'
    },
    legalFlag: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'LegalFlag'
    },
    membershipType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'MembershipType'
    },
    statusComments: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'StatusComments'
    },
    noLicenceStatement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'NoLicenceStatement'
    },
    noClubStatement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'NoClubStatement'
    },
    currentAccountType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CurrentAccountType'
    },
    clubId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ClubID'
    },
    licenceReminder: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'LicenceReminder'
    },
    licenceReminderDate1: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'LicenceReminderDate1'
    },
    licenceReminderDate2: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'LicenceReminderDate2'
    },
    clubReminder: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ClubReminder'
    },
    clubReminderDate1: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'ClubReminderDate1'
    },
    clubReminderDate2: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'ClubReminderDate2'
    },
    cartFees: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'CartFees'
    },
    smsSend: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'SmsSend'
    },
    allowReward: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'AllowReward'
    },
    prospectId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'ProspectID'
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Password'
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mrmPersonalInfo',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_mrmPersonalInfo",
        fields: [
          { name: "ClassType" },
          { name: "AccountStatus" },
          { name: "MemberNo" },
          { name: "NominatedBy" },
        ]
      },
      {
        name: "PK_mrmPersonalInfo",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
