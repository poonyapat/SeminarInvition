const {
    Attendee,
    Seminar,
    User
} = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op


module.exports = {
    test: async (req, res) => {
        const seminar = await Seminar.findOne({
            where: {
                id: 4
            }
        })
        const nNormalAttendees = (await Attendee.count({
            where: {
                seminar: seminar.id,
                status: {
                    $not : 'Alternative'
                }
            }
        }))
        let nAvailableSeat = seminar.maximumAttendees - seminar.maximumReserves - nNormalAttendees
        const attendees = await Attendee.findAll({
            where: {
                seminar: seminar.id,
                status: 'Alternative'
            },
            limit: nAvailableSeat,
            order: Sequelize.col('order')
        })
        res.send(attendees)
    }
}