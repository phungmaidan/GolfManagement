export default function (sequelize, DataTypes) {
    return sequelize.define('FreTemplateMaster', {
        templateId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            field: 'TemplateID'
        },
        description: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'Description'
        },
        minMember: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true,
            field: 'MinMember'
        },
        maxBooking: {
            type: DataTypes.DECIMAL(18, 0),
            allowNull: true,
            field: 'MaxBooking'
        },
        barrel: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'Barrel'
        },
        morningBarrel: {
            type: DataTypes.STRING(10),
            allowNull: true,
            field: 'MorningBarrel'
        },
        afternoonBarrel: {
            type: DataTypes.STRING(10),
            allowNull: true,
            field: 'AfternoonBarrel'
        },
        nightBarrel: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'NightBarrel'
        }
    }, {
        sequelize,
        tableName: 'FreTemplateMaster',
        schema: 'dbo',
        timestamps: false,
        indexes: [
            {
                name: 'PK_FreTemplateMaster',
                unique: true,
                fields: [
                    { name: 'TemplateID' }
                ]
            }
        ]
    })
}
