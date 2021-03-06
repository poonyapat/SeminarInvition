import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import MyRegistered from './views/MyRegistered.vue'
import MyCreatedSeminar from './views/MyCreatedSeminar'
import SeminarCreation from './views/SeminarCreation'
import SeminarInformation from './views/SeminarInformation'
import AttendeesInformation from './views/AttendeesInformation'
import AttentionConfirming from './views/AttentionConfirming'
import SeminarRegister from './views/SeminarRegister'
import SeminarEditor from './views/SeminarEditor'
import Browse from './views/Browse'
import Report from './views/Report'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
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
        },
        {
            path: '/seminar/:id',
            name: 'seminarInformation',
            component: SeminarInformation
        },
        {
            path: '/seminar/:id/register',
            name: 'seminarRegister',
            component: SeminarRegister
        },
        {
            path: '/seminar/:id/edit',
            name: 'seminarEditor',
            component: SeminarEditor
        },
        {
            path: '/seminar/:id/attendees',
            name: 'attendeesInformation',
            component: AttendeesInformation
        },
        {
            path: '/seminar/:seminar/confirm/:username',
            name: 'attentionConfirming',
            component: AttentionConfirming
        },
        {
            path: '/seminar/:seminar/report',
            name: 'report',
            component: Report
        }
    ]
})