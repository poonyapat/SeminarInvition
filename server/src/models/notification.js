module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('Information', 'Notification', 'Warning', 'Validation', 'Success', 'Message'),
            allowNull: false
        }
    })
    const Attendee = sequelize.import('./attendee')
    Attendee.hasMany(Notification, {foreignKey: 'user'})

    return Notification
}