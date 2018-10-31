const {Seminar, RequiredData} = require('../models')

module.exports = {
    async findAll(req, res) {
        try {
            if (req.query.search) {
                const seminars = await Seminar.findAll({
                    limit: 10,
                    where: {
                        title: {
                            $like: `%${req.query.search}%`
                        }
                    }
                })
                res.send(seminars)
            }
            else {
                const seminars = await Seminar.findAll({
                    // limit: 10
                })
                res.send(seminars)
            }
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the seminars'
            })
        }
    },
    async findOneById(req, res) {
        try {
            const seminar = await Seminar.findOne({
                where: {
                    id: req.query.id
                }
            })
            if (!seminar) {
                res.status(403).send({
                    error: 'Seminar is not found'
                })
            }
            res.send(seminar)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the seminars'
            })
        }
    },
    async findAllByAuthor(req, res) {
        try {
            const seminars = await Seminar.findAll({
                where: {
                    author: req.query.author
                }
            })
            res.send(seminars)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the seminars'
            })
        }
    },
    async create(req, res) {
        try {
            req.body.info.currentRegistered = 0
            const seminar = await Seminar.create(req.body.info)
            req.body.requiredData.seminar = seminar.id
            const requiredData = await RequiredData.create(req.body.requiredData)
            seminar.update({
                author: req.body.author
            })
            res.send({seminar:seminar, requiredData: requiredData})
        }
        catch (error) {
            res.status(500).send({
                error:error
            })
        }
    },
    async update(req, res) {
        try {
            const seminar = await Seminar.findOne({ where: { id:req.body.id } })
            await seminar.update(req.body.info)
        } catch (error) {
            res.status(500).send({
                error: error
            })
            return;
        }
        try {
            const requiredData = await RequiredData.findOne({ where: { id: req.body.id } })
            await requiredData.update(req.body.requiredData)
            res.status(200).send()
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    },
    async getRequiredData(req, res){
        try {
            const requiredData = await RequiredData.findOne({
                where: {
                    seminar: req.query.id
                }
            })
            if (!requiredData){
                res.status(500).send({
                    error: 'An error has occured trying to get seminar\'s required data'
                })
            }
            res.send(requiredData)
        }
        catch(error){
            res.status(500).send({
                error: 'An error has occured trying to get seminar\'s required data'
            })
        }
    }
}