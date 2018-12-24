const {
    Attendee,
    Seminar,
    User,
    Transaction
} = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op


module.exports = {
    test: async (req, res) => {
        try {

            const today = new Date(new Date().toISOString().substring(0, 10))
            const tmr = new Date(today)
            tmr.setDate(tmr.getDate() + 1)
            const transaction = await Transaction.findOne({
                where: {
                    seminar: 3,
                    user: 'deityngo',
                    action: 'present',
                    createdAt: {
                        [Op.lt]: tmr,
                        [Op.gt]: today
                    }
                }
            })
            if (!transaction) {
                res.send(transaction)
            } else {
                res.status(403).send({
                    error: 'Attendee is already checked today'
                })
            }
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }
}