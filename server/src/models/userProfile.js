

module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define('UserProfile', {
        username: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            allowNull: false
        },
        fullname: DataTypes.STRING,
        gender: DataTypes.ENUM('Male', 'Female', 'Other'),
        age: DataTypes.INTEGER,
        nationality: DataTypes.STRING(20),
        email: DataTypes.STRING,
        contactNumber: DataTypes.STRING(20),
        officeNumber: DataTypes.STRING(20),
        fax: DataTypes.STRING(30),
        company: DataTypes.STRING,
        credit: {
            type: DataTypes.FLOAT,
            default: 5,
            allowNull: false
        }

    })
    const User = sequelize.import('./user')
    UserProfile.belongsTo(User)

    return UserProfile
}