const SeminarController = require('./controllers/seminarController')
const UserController = require('./controllers/userController')

module.exports = (app) => {
    app.post('/seminar/create', 
    SeminarController.create)

    app.get('/seminar',
    SeminarController.findAll)

    app.post('/user',
    UserController.authenticate)
}