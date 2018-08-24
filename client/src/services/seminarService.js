import Api from '@/services/api'

export default {
    findAll(data){
        return Api().get('seminar', {
            params: {
                search: data
            }
        })
    },
    create(data){
        return Api().post('seminar/create', data)
    },
    findAllByAttendeeUsername(data){
        return Api().post('registered_seminars', data)
    }
}