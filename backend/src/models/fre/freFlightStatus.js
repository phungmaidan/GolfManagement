export default function (sequelize, DataTypes) {
    return sequelize.define('FreFlightStatus', {
        id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            field: 'ID'
        },
        description: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'Description'
        },
        allow: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            field: 'Allow'
        },
        color: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'Color'
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'Password'
        }
    }, {
        sequelize,
        tableName: 'FreFlightStatus',
        schema: 'dbo',
        timestamps: false,
        indexes: [
            {
                name: "PK_FreFlightStatus",
                unique: true,
                fields: [
                    { name: "ID" },
                ]
            },
        ]
    });
};
