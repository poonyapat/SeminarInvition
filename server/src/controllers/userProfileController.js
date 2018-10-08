const {Seminar, RequiredData} = require('../models')

module.exports = {
    async getRequiredData(req, res){
        try {
            const requiredData = await RequiredData.findOne({
                where: {
                    seminar: req.query.id
                }
            })
            if (!requiredData){
                res.status(500).send({
                    error: 'An error has occured trying to get seminar\'s required data'
                })
            }
            res.send(requiredData)
        }
        catch(error){
            res.status(500).send({
                error: 'An error has occured trying to get seminar\'s required data'
            })
        }
    }
}