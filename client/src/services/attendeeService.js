import Api from '@/services/api'

export default {
    cancelRegistration(attendee){
        return Api().post('cancel_registration', attendee)
    }
}