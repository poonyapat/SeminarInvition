import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://10.2.48.233:8081/`
    })
}