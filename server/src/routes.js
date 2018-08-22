const SeminarController = require('./controllers/seminarController')
const UserController = require('./controllers/userController')

module.exports = (app) => {
    app.post('/seminar/create', 
    SeminarController.create)

    app.get('/seminar',
    SeminarController.findAll)

    app.post('/login',
    UserController.authenticate)

    app.post('/register',
    UserController.register)
}