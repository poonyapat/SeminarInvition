const bcrypt = require('bcryptjs')

async function hashPassword(user, options) {
    const SALT_FACTOR = 8

    if (!user.changed('password')) {
        return
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.setDataValue('password', hash)
        })
    })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('Admin', 'Seminar Admin', 'External User'),
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
        },
        birthDate: DataTypes.DATE
    }, {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    })

    User.prototype.comparePassword = function (password) {
        return bcrypt.compare(password, this.password)
    }


    return User
}