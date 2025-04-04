export default (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    players: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending'
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'bookings',
    timestamps: true
  })

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
    Booking.belongsTo(models.Course, {
      foreignKey: 'courseId',
      as: 'course'
    })
  }

  return Booking
}