const {Attendee, Seminar} = require('../models')


module.exports = {
    async findSeminarByUser(req, res){
        try {
            console.log(req.query)
            const attendees = await Attendee.findAll({
                where: {
                    user: req.query.user
                }
            })
            // res.send(attendees)
            let seminars = []
            for (let i = 0; i < attendees.length; i++){
                seminars.push(await Seminar.findOne({
                    where: {
                        id: attendees[i].seminar
                    }
                }))
            }
            res.send(seminars)
        } catch(err){
            res.status(500).send({
                // error: 'An error has occured trying to fetch the seminars'
                error: err
            })
        }

    },
    async register(req, res){
        try {
            const attendee = await Attendee.create(req.body)
            const seminar = await Seminar.findOne({
                where: {
                    id: attendee.seminar
                }
            })
            seminar.update({
                currentRegistered: seminar.currentRegistered+1
            })
            res.send(attendee)
        }catch(error){
            res.status(500).send({
                // error: 'error has occured trying to register'
                error: error
            })
        }
    },
    async cancelRegistration(req, res){
        try {
            const {user, seminar} = req.body
            const attendee = await Attendee.findOne({
                where: {
                    user: user,
                    seminar: seminar
                }
            })
            if (!attendee){
                res.status(403).send({
                    error: 'Attendee is not found'
                })
            }
            const registeredSeminar = await Seminar.findOne({
                where: {
                    id: seminar
                }
            })
            registeredSeminar.update({
                currentRegistered: registeredSeminar.currentRegistered-1
            })
            attendee.destroy()
        } catch(error){
            res.status(500).send({
                error: error
            })
        }
    }
}