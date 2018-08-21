const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user){
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register(req, res){
        try {
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch(error){
            error.status(400).send({
                error: 'This account is already exist'
            })
        }
    },
    async login(req, res){
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
            const isPasswordValid = user.comparePassword(password)
            if (!isPasswordValid){
                res.status(403).send({
                    error: 'Wrong password'
                })
            }
        } catch (error){
            error.status(500).send({
                error: 'An error has occured trying to login'
            })
        }
    }
}