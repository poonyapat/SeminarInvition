const {
    Transaction
} = require('../models')

const sequelize = require('sequelize')
const Op = sequelize.Op

module.exports = {
    async create(req, res) {
        try {
            const transaction = await Transaction.create(req.body)
            res.send(transaction)
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    },
}