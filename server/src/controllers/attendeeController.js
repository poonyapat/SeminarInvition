const {
    Attendee,
    Seminar,
    User,
    Transaction
} = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op


const schedule = require('node-schedule')
schedule.scheduleJob('0 0 0 * * *', async () => {
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
    })
    try {
        for (let i = 0; i < seminars.length; i++) {
            const attendees = await Attendee.findAll({
                where: {
                    seminar: seminars[i].id,
                    present: 0,
                    isVIP: false
                }
            })
            await User.decrement({
                credit: 0.2
            }, {
                where: {
                    username: {
                        [Op.in]: attendees.filter(attendee => attendee.present == 0).map(attendee => attendee.user)
                    },
                    credit: {
                        [Op.gt]: 0
                    }
                }
            })
            await Attendee.update({
                isPresent: false
            }, {
                where: {
                    seminar: seminars[i].id,
                    present: {
                        [Op.lt]: seminars[i].dates.length
                    },
                    isVIP: false
                }
            })
        }
    } catch (error) {
        console.log(error)
        console.log("Updating is error")
    }
})

async function doCancelRegistration(attendee, registeredSeminar) {
    if (!attendee) {
        return {
            complete: false,
            code: 403,
            error: 'Attendee is not found'
        }
    }
    const vip = attendee.isVIP
    attendee.destroy()
    if (vip) {
        return {
            complete: true,
            code: 200
        }
    }
    registeredSeminar.update({
        currentRegistered: registeredSeminar.currentRegistered - 1
    })
    const firstQueue = await Attendee.min('order', {
        where: {
            seminar: attendee.seminar,
            status: 'Alternative'
        }
    })
    if (firstQueue) {
        const nextAttendee = await Attendee.findOne({
            where: {
                seminar: attendee.seminar,
                status: 'Alternative',
                order: firstQueue
            }
        })
        nextAttendee.update({
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
    async grantVIP(req, res) {
        try {
            const attendee = await Attendee.findOne({
                where: {
                    user: req.body.user,
                    seminar: req.body.seminar
                }
            })
            if (!attendee) {
                res.status(404).send({
                    error: 'Attendee is not found'
                })
            }
            await attendee.update({
                isVIP: true
            })
            await Seminar.decrement({
                currentRegistered: 1
            }, {
                where: {
                    id: req.body.seminar
                }
            })
            const firstQueue = await Attendee.min('order', {
                where: {
                    seminar: attendee.seminar,
                    status: 'Alternative'
                }
            })
            if (firstQueue) {
                const nextAttendee = await Attendee.findOne({
                    where: {
                        seminar: attendee.seminar,
                        status: 'Alternative',
                        order: firstQueue
                    }
                })
                nextAttendee.update({
                    status: 'Attended',
                    order: null
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
    },
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
            const nAlternate = await Attendee.count({
                where: {
                    seminar: req.body.seminar,
                    status: 'Alternative'
                }
            }) || 0
            if (nMainAttendees >= seminar.maximumAttendees) {
                req.body.status = 'Alternative'
                req.body.order = nAlternate + 1
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
                res.status(404).send({
                    error: 'Attendee is not found'
                })
            }
            await attendee.update({
                status: req.body.newStatus
            })
            console.log(attendee)
            res.send({
                nessage: "Update Complete"
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: error
            })
        }
    },
    async present(req, res) {
        try {
            const attendee = await Attendee.findOne({
                where: {
                    user: req.body.username,
                    seminar: req.body.seminar
                }
            })
            if (!attendee) {
                res.status(404).send({
                    error: 'Attendee is not found'
                })
            }
            const seminar = await Seminar.findOne({
                where: {
                    id: req.body.seminar
                }
            })
            if (attendee.present >= seminar.dates.length) {
                res.status(403).send({
                    error: 'Attendee was completely checked'
                })
            }
            let today = new Date().toISOString().substring(0, 10)
            if (!(seminar.dates.map(date => date.toISOString().substring(0, 10)).includes(today))) {
                res.status(403).send({
                    error: 'Wrong Date'
                })
            }
            today = new Date(today)
            const tmr = new Date(today)
            tmr.setDate(tmr.getDate() + 1)
            const transaction = await Transaction.findOne({
                where: {
                    seminar: attendee.seminar,
                    user: attendee.user,
                    action: 'present',
                    createdAt: {
                        [Op.lt]: tmr,
                        [Op.gt]: today
                    }
                }
            })
            if (!transaction) {
                await attendee.increment({
                    present: 1
                })
                if (attendee.present >= seminar.dates.length) {
                    const user = await User.findOne({
                        where: {
                            username: attendee.user
                        }
                    })
                    if (user.credit <= 4.8) {
                        await user.increment({
                            credit: 0.2
                        })
                    } else {
                        await user.update({
                            credit: 5
                        })
                    }
                    await attendee.update({
                        isPresent: true
                    })
                }
                res.send({
                    nessage: "Update Complete"
                })
            } else {
                res.status(403).send({
                    error: 'Attendee is already checked today'
                })
            }
        } catch (error) {
            console.log(error)
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