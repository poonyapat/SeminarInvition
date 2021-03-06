module.exports = (sequelize, DataTypes) => {
    const Attendee = sequelize.define('Attendee', {
        registeredData: {
            type: DataTypes.JSON,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Confirmed', 'Attended', 'Alternative', 'Reserved'),
            allowNull: false
        },
        order: {
            type: DataTypes.INTEGER,
        },
        isPresent: {
            type: DataTypes.BOOLEAN
        },
        present: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isVIP: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        indexes: [
            {
                unique: true,
                fields: ['seminar', 'status', 'order']
            }
        ]
    })
    const User = sequelize.import('./user')
    const Seminar = sequelize.import('./seminar')
    User.belongsToMany(Seminar, {
        through: Attendee,
        foreignKey: 'user'
    })
    Seminar.belongsToMany(User, {
        through: Attendee,
        foreignKey: 'seminar'
    })

    return Attendee
}