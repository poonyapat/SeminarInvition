const SeminarController = require('./controllers/seminarController')

module.exports = (app) => {
    app.post('/seminar/create', 
    SeminarController.create)

    app.get('/seminar',
    SeminarController.findAll)
}