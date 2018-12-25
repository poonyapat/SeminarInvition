const {
    User
} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
    const ONE_WEEK = 24 * 60 * 60 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

function jwtVerifyUser(username, token) {
    try {
        decoded = jwt.verify(token, config.authentication.jwtSecret)
        if (decoded.username === username)
            return true
        else return false
    } catch (err) {
        return false
    }
}

module.exports = {
    async register(req, res) {
        try {
            req.body.role = 'External User'
            req.body.credit = 5
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'This account is already exist'
            })
        }
    },
    async generate(req, res) {
        try {
            const admin = await User.findOne({
                where: {
                    username: req.body.adminCredential.username
                }
            })
            if (!admin) {
                res.status(403).send({
                    error: 'Invalid Admin\'s Credential'
                })
            }
            const isPasswordValid = await admin.comparePassword(req.body.adminCredential.password)
            if (!isPasswordValid) {
                res.status(403).send({
                    error: 'Invalid Admin\'s Credential'
                })
            }
            if (req.body.user.username === req.body.user.password) {
                res.status(400).send({
                    error: 'Password cannot be same as username'
                })
            }
            req.body.user.credit = 5
            const user = await User.create(req.body.user)
            res.send(user.toJSON())
        } catch (error) {
            res.status(400).send({
                error: 'Invalid User Data'
            })
        }
    },
    async authenticate(req, res) {
        try {
            const {
                username,
                password
            } = req.body
            const user = await User.findOne({
                where: {
                    username: username
                }
            })
            if (!user) {
                res.status(403).send({
                    error: 'This account doesn\'t exist'
                })
            }
            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                res.status(403).send({
                    error: 'Wrong password'
                })
            }
            token = jwtSignUser({
                username: user.username
            })
            jwtVerifyUser(user.username, token)
            delete user.dataValues.password
            res.send({
                user: user,
                token: token
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to login, Contact Admin'
            })
        }
    },
    async updateProfile(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            })
            if (jwtVerifyUser(req.body.username, req.body.token)) {
                user.update(req.body.data)
                res.status(200).send()
            } else {
                res.status(402).send({
                    error: 'Unauthentication'
                })
            }
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to update user profile, Contact Admin'
            })
        }
    },

    async verify(req, res) {
        try {
            decoded = jwtVerifyUser(req.body.username, req.body.token)
            res.status(200).send({
                verified: decoded
            })
        } catch (err) {
            res.status(500).send({
                error: 'Invalid'
            })
        }
    },

    async findOneByUsername(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.query.username
                }
            })
            if (!user) {
                res.status(404).send({
                    error: 'User is not found'
                })
            } else {
                res.send(user)
            }
        } catch (error) {
            res.status(500).send({
                error: 'Error has occurs, trying to find User'
            })
        }
    },

    async findAllByUsernames(req, res) {
        try {
            const users = await User.findAll({
                where: {
                    username: {
                        in: req.query.usernames
                    }
                },
                attributes: req.query.attributes
            })
            if (!users) {
                res.status(404).send({
                    error: 'User is not found'
                })
            } else {
                res.send(users)
            }
        } catch (error) {
            res.status(500).send({
                error: 'Error has occurs, trying to find Users'
            })
        }
    }
}