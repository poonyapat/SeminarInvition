const {
    Attendee,
    Seminar,
    User
} = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op


module.exports = {
    test: async (req, res) => {
        let seminars;
        try {
            seminars = await Seminar.findAll({
                attributes: ['dates', 'id']
            })
        } catch (error) {
            console.log("error: Seminar Querying")
        }
        seminars = seminars.filter(seminar => {
            let today = new Date().toISOString()
            for (let i = 0; i < seminar.dates.length; i++) {
                if (today < seminar.dates[i].toISOString()) {
                    return false
                }
            }
            return true
        }).map(seminar => seminar.id)
        try {
            const attendees = await Attendee.findAll({
                where: {
                    seminar: {
                        [Op.in]: seminars
                    },
                    isPresent: {
                        [Op.eq]: null
                    }
                }
            })
            await attendees.update({ isPresent: true })
            const users = await User.findAll({
                where: {
                    id: {
                        [Op.in]: attendees.map(attendee => attendee.id)
                    },
                    credit: {
                        [Op.gt]: 0
                    }
                }
            })
            users.decrement('credit', {by: 0.2})
        } catch (error) {
            console.log("Updating is error")
        }
        res.send(attendees)
    }
}