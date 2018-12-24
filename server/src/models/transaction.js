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
    User.hasMany(Transaction, { foreignKey: 'user' })
    Seminar.hasMany(Transaction, { foreignKey: 'seminar' })

    return Transaction
}