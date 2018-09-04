import Api from '@/services/api'

export default {
    authenticate(credential) {
        return Api().post('login', credential)
    },

    register(userData) {
        return Api().post('register', userData)
    }
}