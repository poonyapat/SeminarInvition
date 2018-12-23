// user,seminarId,action,detail
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        action: {
            type: DataTypes.STRING,
            notNull: true
        },
        detail: {
            type: DataTypes.TEXT,
        },
    })
    const User = sequelize.import('./user')
    const Seminar = sequelize.import('./seminar')
    User.belongsToMany(Seminar, {
        through: Transaction,
        foreignKey: 'user'
    })
    Seminar.belongsToMany(User, {
        through: Transaction,
        foreignKey: 'seminar'
    })

    return Transaction
}