const {
    Attendee,
    Seminar,
    User
} = require('../models')


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
            const attendee = await Attendee.create(req.body)
            const seminar = await Seminar.findOne({
                where: {
                    id: attendee.seminar
                }
            })
            seminar.update({
                currentRegistered: seminar.currentRegistered + 1
            })
            res.send(attendee)
        } catch (error) {
            res.status(500).send({
                // error: 'error has occured trying to register'
                error: error
            })
        }
    },
    async cancelRegistration(req, res) {
        try {
            const {
                user,
                seminar
            } = req.body
            const attendee = await Attendee.findOne({
                where: {
                    user: user,
                    seminar: seminar
                }
            })
            if (!attendee) {
                res.status(403).send({
                    error: 'Attendee is not found'
                })
            }
            const registeredSeminar = await Seminar.findOne({
                where: {
                    id: seminar
                }
            })
            attendee.destroy()
            registeredSeminar.update({
                currentRegistered: registeredSeminar.currentRegistered - 1
            })
            res.status(200).send()
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
            if (req.body.newStatus === 'Declined') {
                const seminar = await Seminar.findOne({
                    where: {
                        id: req.body.seminar
                    }
                })
                seminar.update({
                    currentRegistered: seminar.currentRegistered - 1
                })
            }
            res.send({
                nessage: "Update Complete"
            })
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }
}