const SeminarController = require('./controllers/seminarController')
const UserController = require('./controllers/userController')
const UserPolicy = require('./policies/userPolicy')

module.exports = (app) => {
    app.post('/seminar/create', 
    SeminarController.create)

    app.get('/seminar',
    SeminarController.findAll)

    app.post('/login',
    UserController.authenticate)

    app.post('/register',
    UserPolicy.register,
    UserController.register)
}