const {
    Attendee,
    Seminar,
    User
} = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function doCancelRegistration(attendee, registeredSeminar){
    if (!attendee) {
        return {
            complete: false,
            code: 403,
            error: 'Attendee is not found'
        }
    }
    attendee.destroy()
    registeredSeminar.update({
        currentRegistered: registeredSeminar.currentRegistered - 1
    })
    const firstQueue = await Attendee.min('order', {
        where: {
            seminar: attendee.seminar,
            status: 'Reserved'
        }
    })
    if (firstQueue) {
        const firstReservedAttendee = await Attendee.findOne({
            where: {
                seminar: attendee.seminar,
                status: 'Reserved',
                order: firstQueue
            }
        })
        firstReservedAttendee.update({
            status: 'Attended',
            order: null
        })   
    }
    return {
        complete: true,
        code: 200
    }
}

module.exports = {
    async findSeminarByUser(req, res) {
        try {
            const attendees = await Attendee.findAll({
                where: {
                    user: req.query.user
                }
            })
            // res.send(attendees)
            let seminars = []
            for (let i = 0; i < attendees.length; i++) {
                seminars.push(await Seminar.findOne({
                    where: {
                        id: attendees[i].seminar
                    }
                }))
            }
            res.send(seminars)
        } catch (err) {
            res.status(500).send({
                // error: 'An error has occured trying to fetch the seminars'
                error: err
            })
        }

    },
    async findAllByUser(req, res) {
        try {
            const attendees = await Attendee.findAll({
                where: {
                    user: req.query.user
                }
            })
            res.send(attendees)
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    },
    async findAllBySeminar(req, res) {
        try {
            const attendees = await Attendee.findAll({
                where: {
                    seminar: req.query.seminar
                }
            })
            for (let i in attendees) {
                attendees[i].registeredData.credit = (await User.findOne({
                    where: {
                        username: attendees[i].user
                    },
                    attributes: ['credit']
                })).credit
            }
            res.send(attendees)
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    },
    async register(req, res) {
        try {
            const seminar = await Seminar.findOne({
                where: {
                    id: req.body.seminar
                }
            })
            const nMainAttendees = await Attendee.count({
                where: {
                    seminar: req.body.seminar,
                    status: {
                        [Op.or]: ['Confirmed', 'Attended']
                    }
                }
            })
            const nReserved = await Attendee.count({
                where: {
                    seminar: req.body.seminar,
                    status: 'Reserved'
                }
            }) || 0
            console.log(55555555555555555555 + " " + nReserved + " " + nMainAttendees)
            if (nMainAttendees >= seminar.maximumAttendees) {
                req.body.status = 'Reserved'
                req.body.order = nReserved+1
            }
            const attendee = await Attendee.create(req.body)
            seminar.update({
                currentRegistered: seminar.currentRegistered + 1
            })
            res.send(attendee)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: 'error has occured trying to register'
                // error: error
            })
        }
    },
    async cancelRegistration(req, res) {
        try {
            const {
                user,
                seminar
            } = req.body
            const registeredSeminar = await Seminar.findOne({
                where: {
                    id: seminar
                }
            })
            const attendee = await Attendee.findOne({
                where: {
                    user: user,
                    seminar: seminar
                }
            })
            const result = await doCancelRegistration(attendee, registeredSeminar)
            res.status(result.code).send(result.error)
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    },
    async updateStatus(req, res) {
        try {
            const attendee = await Attendee.findOne({
                where: {
                    user: req.body.user,
                    seminar: req.body.seminar
                }
            })
            if (!attendee) {
                res.status(403).send({
                    error: 'Attendee is not found'
                })
            }
            attendee.update({
                status: req.body.newStatus
            })
            res.send({
                nessage: "Update Complete"
            })
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    },
    async rejectAttendee(req, res) {
        try {
            const {
                user,
                seminar
            } = req.body
            const registeredSeminar = await Seminar.findOne({
                where: {
                    id: seminar
                }
            })
            const attendee = await Attendee.findOne({
                where: {
                    user: user,
                    seminar: seminar
                }
            })
            const result = await doCancelRegistration(attendee, registeredSeminar)
            if (!result.complete)
                res.status(result.code).send(result.error)
            if (!registeredSeminar.dataValues.rejectedList.includes(user)) {   
                await registeredSeminar.update({
                    rejectedList: registeredSeminar.dataValues.rejectedList.concat(user)
                })
            }
            res.send({
                message: 'Update Complete'
            })
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }
}