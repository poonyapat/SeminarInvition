import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import MyRegistered from './views/MyRegistered.vue'
import MyCreatedSeminar from './views/MyCreatedSeminar'
import SeminarCreation from './views/SeminarCreation'
import Browse from './views/Browse'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/seminar/registered',
            name: 'myRegistered',
            component: MyRegistered
        },
        {
            path: '/seminar/browse',
            name: 'browse',
            component: Browse
        },
        {
            path: '/seminar/created',
            name: 'myCreatedSeminar',
            component: MyCreatedSeminar
        },
        {
            path: '/seminar/creation',
            name: 'seminarCreation',
            component: SeminarCreation
        }
    ]
})
