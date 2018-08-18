

module.exports = (sequelize, DataTypes) => {
    const Seminar = sequelize.define('Seminar', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        place: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        maximumAttendees: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        currentRegistered: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contactPhoneNumber: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        contactEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requiredData: {
            type: DataTypes.JSON,
            allowNull: false
        }
    })
    const User = sequelize.import('./user')
    Seminar.belongsTo(User, {foreignKey: 'author'})

    return Seminar
}