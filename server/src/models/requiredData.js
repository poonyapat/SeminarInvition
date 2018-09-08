module.exports = (sequelize, DataTypes) => {
    const RequiredData = sequelize.define('RequiredData', {
        requiredData: {
            type: DataTypes.JSON,
            allowNull: false
        },
        baseInformation: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

    const Seminar = sequelize.import('./seminar')
    Seminar.hasOne(RequiredData, {foreignKey: 'seminar'})

    return RequiredData
}