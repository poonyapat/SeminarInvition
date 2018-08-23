const Joi = require('joi')

module.exports = {
    register(req, res, next){
        const schema = {
            username: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            ),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }

        const {error, value} = Joi.validate(req.body, schema)
        if (error){
            switch(error.details[0].context.key){
                case 'username':
                    errorMsg = `Invalid username: ONLY 8 to 32 characters with lower-case, upper-case or numerics`
                    break
                case 'password':
                    errorMsg = `Invalid password: ONLY 8 to 32 characters with lower-case, upper-case or numerics`
                    break
                default:
                    errorMsg = error.details[0].message  
            }
            res.status(400).send({
                error: errorMsg
            })
        }else{
            next()
        }
    }
}