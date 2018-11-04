import Api from '@/services/api'

export default {
    findAll(data) {
        return Api().get('seminar', {
            params: data
        })
    },
    create(data) {
        return Api().post('seminar/create', data)
    },
    update(data) {
        return Api().post('seminar/update', data)
    },
    findAllByAttendeeUsername(username) {
        return Api().get('registered_seminars', {
            params: {
                user: username
            }
        })
    },
    findOneById(id) {
        return Api().get('seminar/id', {
            params: {
                id: id
            }
        })
    },
    findAllByAuthor(author) {
        return Api().get('seminar/author', {
            params: {
                author: author
            }
        })
    },
    getRequiredData(id){
        return Api().get('seminar/requiredData', {
            params: {
                id: id
            }
        })
    },
}