import Api from '@/services/api'

export default {
    cancelRegistration(attendee){
        return Api().post('attendee/cancel', attendee)
    },

    findAllByUser(user){
        return Api().get('user_attention', {
            params: {
                user: user
            }
        })
    },

    updateStatus(attendee, newStatus){
        return Api().post('attendee/update_status', {
            attendee: attendee,
            newStatus: newStatus
        })
    }
}