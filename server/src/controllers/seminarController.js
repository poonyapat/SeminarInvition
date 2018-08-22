const {Seminar} = require('../models')

module.exports = {
    async findAll(req, res){
        try {
            const seminars = await Seminar.findAll({
                limit: 10
            })
            res.send(seminars)
        }catch(error){
            res.status(500).send({
                error: 'An error has occured trying to fetch the seminars'
            })
        }
    },
    async create(req, res){
        try {
            const seminar = await Seminar.create(req.body.info)
            seminar.update({
                author: req.body.author
            })
            res.send(seminar)
        }
        catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to create the seminar'
            })
        }
    }
}