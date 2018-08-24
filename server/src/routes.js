const SeminarController = require('./controllers/seminarController')
const UserController = require('./controllers/userController')
const UserPolicy = require('./policies/userPolicy')
const AttendeeController = require('./controllers/attendeeController')
module.exports = (app) => {
    app.post('/seminar/create', 
    SeminarController.create)

    app.post('/registered_seminars',
    AttendeeController.findSeminarByUser)

    app.get('/seminar',
    SeminarController.findAll)
    
    app.post('/seminar',
    SeminarController.findAll)

    app.post('/seminar/register',
    AttendeeController.register)

    app.post('/login',
    UserController.authenticate)

    app.post('/register',
    UserPolicy.register,
    UserController.register)
}