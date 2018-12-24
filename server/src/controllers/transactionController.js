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
    async findLatestByUserAndSeminar(req, res) {
        try {
            const transaction = await Transaction.findOne({
                where: {
                    action: req.query.action,
                    user: req.query.user,
                    seminar: req.query.seminar
                },
                order: [ [ 'createdAt', 'DESC' ]]
            })
            if (!transaction) {
                res.status(404).send({error: `Transaction is not found.`})
            }
            res.send(transaction)
        } catch(error){
            res.status(500).send({
                error: error
            })
        }
    }
}