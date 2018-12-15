import Api from '@/services/api'

export default {
    cancelRegistration(username, seminarId) {
        return Api().post('attendee/cancel', {
            user: username,
            seminar: seminarId
        })
    },

    rejectAttendee(username, seminarId) {
        return Api().post('attendee/reject', {
            user: username,
            seminar: seminarId
        })
    },

    findAllByUser(user) {
        return Api().get('user_attention', {
            params: {
                user: user
            }
        })
    },

    findAllBySeminar(seminarId) {
        return Api().get('seminar/attendees', {
            params: {
                seminar: seminarId
            }
        })
    },

    updateStatus(username, seminarId, newStatus) {
        return Api().post('attendee/update_status', {
            user: username,
            seminar: seminarId,
            newStatus: newStatus
        })
    },

    register(username, seminarId, data) {
        return Api().post('seminar/register', {
            user: username,
            seminar: seminarId,
            registeredData: data,
            status: 'Attended'
        })
    },

    present(username, seminar) {
        return Api().post('attendee/present', {
            username: username,
            seminar: seminar
        })
    }
}