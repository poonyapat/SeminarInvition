import Api from '@/services/api'

export default {
    authenticate(credential) {
        return Api().post('login', credential)
    },

    register(userData) {
        return Api().post('register', userData)
    },

    update(username, data, token) {
        return Api().post('userProfile/update', {
            username: username,
            data: data,
            token: token
        })
    },

    findOneByUsername(username) {
        return Api().get('user', {
            params: {
                username: username
            }
        })
    },

    generateUser(adminCredential, userData) {
        return Api().post('user/generate', {
            adminCredential: adminCredential,
            user: userData
        })
    },

    findAll(query) {
        return Api().get('user/all', {
            params: query
        })
    }
}