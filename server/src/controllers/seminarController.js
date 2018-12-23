const {
    Seminar,
    RequiredData,
    Attendee,
    User
} = require('../models')

const sequelize = require('sequelize')
const Op = sequelize.Op

module.exports = {
    async findAll(req, res) {
        try {
            let limit = 10
            let offset = limit * (req.query.page - 1)
            if (req.query.search) {
                const seminars = await Seminar.findAndCountAll({
                    offset: offset,
                    limit: limit,
                    where: {
                        title: {
                            $like: `%${req.query.search}%`,
                        }
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                        model: User,
                        attributes: ['fullname']
                    }]
                })
                res.send(seminars)
            } else {
                const seminars = await Seminar.findAndCountAll({
                    offset: offset,
                    limit: limit,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                        model: User,
                        attributes: ['fullname']
                    }]
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
                },
                include: [{
                    model: User,
                    attributes: ['fullname']
                }]
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
    async findAllByIds(req, res) {
        try {
            console.log(req)
            const seminars = await Seminar.findAll({
                where: {
                    id: { [Op.in]: req.query.ids }
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: User,
                    attributes: ['fullname']
                }]
            })
            res.send(seminars)
        } catch (error) {
            console.log(error)
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
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: User,
                    attributes: ['fullname']
                }]
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
            res.send({
                seminar: seminar,
                requiredData: requiredData
            })
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    },
    async update(req, res) {
        try {
            const seminar = await Seminar.findOne({
                where: {
                    id: req.body.id
                }
            })
            await seminar.update(req.body.info)
            const nNormalAttendees = (await Attendee.count({
                where: {
                    seminar: seminar.id,
                    status: {
                        $not : 'Alternative'
                    }
                }
            }))
            let nAvailableSeat = seminar.maximumAttendees - seminar.maximumReserves - nNormalAttendees
            if (nAvailableSeat > 0) {
                const attendees = await Attendee.findAll({
                    limit: nAvailableSeat,
                    order: sequelize.col('order'),
                    where: {
                        seminar: seminar.id,
                        status: 'Alternative'
                    },
                })
                attendees.forEach(async attendee => {
                    await attendee.update({
                        status: 'Attended',
                        order: null
                    })
                });
            }
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
        if (req.body.requiredData) {
            try {
                const requiredData = await RequiredData.findOne({
                    where: {
                        id: req.body.id
                    }
                })
                await requiredData.update(req.body.requiredData)
                res.status(200).send({})
            } catch (error) {
                res.status(500).send({
                    error: error
                })
            }
        }
    },
    async getRequiredData(req, res) {
        try {
            const requiredData = await RequiredData.findOne({
                where: {
                    seminar: req.query.id
                }
            })
            if (!requiredData) {
                res.status(500).send({
                    error: 'An error has occured trying to get seminar\'s required data'
                })
            }
            res.send(requiredData)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to get seminar\'s required data'
            })
        }
    },
    
}