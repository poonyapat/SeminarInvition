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
            const attendee = (await Attendee.create(req.body)).data
            res.send(attendee)
        }catch(error){
            res.status(500).send({
                // error: 'error has occured trying to register'
                error: error
            })
        }

    }
}