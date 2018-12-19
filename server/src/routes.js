const SeminarController = require('./controllers/seminarController')
const UserController = require('./controllers/userController')
const UserPolicy = require('./policies/userPolicy')
const AttendeeController = require('./controllers/attendeeController')
const TestController = require('./controllers/testController')
module.exports = (app) => {
    app.post('/seminar/create',
        SeminarController.create)

    app.get('/registered_seminars',
        AttendeeController.findSeminarByUser)

    app.get('/seminar',
        SeminarController.findAll)

    app.get('/seminar/author',
        SeminarController.findAllByAuthor)

    app.post('/seminar/register',
        AttendeeController.register)

    app.post('/attendee/cancel',
        AttendeeController.cancelRegistration)

    app.post('/login',
        UserController.authenticate)

    app.post('/register',
        UserPolicy.register,
        UserController.register)

    app.get('/user_attention',
        AttendeeController.findAllByUser)

    app.get('/seminar/id',
        SeminarController.findOneById)

    app.post('/attendee/update_status',
        AttendeeController.updateStatus)
    app.post('/attendee/reject',
        AttendeeController.rejectAttendee)

    app.get('/seminar/requiredData',
        SeminarController.getRequiredData)
    
    app.get('/seminar/attendees',
        AttendeeController.findAllBySeminar)

    app.post('/seminar/update',
        SeminarController.update)
    
    app.get('/user',
        UserController.findOneByUsername)

    app.get('/user/all',
        UserController.findAll)
    
    app.post('/userProfile/update',
        UserController.updateProfile)
    
    app.post('/user/verify',
        UserController.verify)
    
    app.post('/user/generate',
        UserController.generate)
    
    app.post('/attendee/present',
        AttendeeController.present)
    
    app.get('/test',
        TestController.test)
}