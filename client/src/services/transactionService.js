import Api from '@/services/api'

export default {
    create(username, seminar, action, detail) {
        return Api().post('transaction/create', {
            user: username,
            seminar: seminar,
            action: action,
            detail: detail
        })
    },
    findLatestByUserAndSeminar(username, seminar, action) {
        return Api().get('transaction/findOne/latest', {
            params: {
                user: username,
                seminar: seminar,
                action: action
            }
        })
    }
}