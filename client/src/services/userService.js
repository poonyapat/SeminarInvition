import Api from '@/services/api'

export default {
    authenticate(credential){
        return Api().post('user', credential)
    },
}