import Api from '@/services/api'

export default {
    cancelRegistration(username, seminarId) {
        return Api().post('attendee/cancel', {
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
    }
}