module.exports = (sequelize, DataTypes) => {
    const Attendee = sequelize.define('Attendee', {
        registeredData: {
            type: DataTypes.JSON,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('Confirmed', 'Attended', 'Cancelled'),
            default: 'Attended',
            allowNull: false
        }
    })
    const User = sequelize.import('./user')
    const Seminar = sequelize.import ('./seminar')
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