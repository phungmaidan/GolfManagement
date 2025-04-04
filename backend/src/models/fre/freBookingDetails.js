export default function (sequelize, DataTypes) {
    return sequelize.define('FreBookingDetails', {
        bookingId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            field: 'BookingID'
        },
        counter: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            field: 'Counter'
        },
        guestType: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'GuestType'
        },
        memberNo: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'MemberNo'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'Name'
        },
        handicap: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'Handicap'
        },
        contactNo: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'ContactNo'
        },
        guestId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'GuestID'
        },
        bagTag: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'BagTag'
        },
        caddyNo: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'CaddyNo'
        },
        folioId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'FolioID'
        },
        lockerNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'LockerNo'
        },
        buggyNo: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'BuggyNo'
        }
    }, {
        sequelize,
        tableName: 'FreBookingDetails',
        schema: 'dbo',
        timestamps: false,
        indexes: [
            {
                name: 'PK_FreBookingDetails',
                unique: true,
                fields: [
                    { name: 'BookingID' },
                    { name: 'Counter' }
                ]
            }
        ]
    });
}
