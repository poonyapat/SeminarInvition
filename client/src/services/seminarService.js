import Api from '@/services/api'

export default {
    findAll(){
        return Api().get('seminar')
    },
    create(data){
        return Api().post('seminar/create', data)
    }
}