const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user){
    const ONE_WEEK = 10
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register(req, res){
        try {
            req.body.role = 'External User'
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch(err){
            res.status(400).send({
                error: 'This account is already exist'
            })
        }
    },
    async authenticate(req, res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({
                where: {
                    username: username
                }
            })
            if (!user){
                res.status(403).send({
                    error: 'This account doesn\'t exist'
                })
            }
            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid){
                res.status(403).send({
                    error: 'Wrong password'
                })
            }
            // const userJSON = user.toJSON
            const reducedUser = {
                username: user.username,
                role: user.role
            }
            res.send({
                user: reducedUser,
                token: jwtSignUser(reducedUser)
            })
        } catch (err){
            res.status(500).send({
                error: 'An error has occured trying to login'
            })
        }
    }
}