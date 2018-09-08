import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [
        createPersistedState()
    ],
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false,
        attendees: []
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            state.isUserLoggedIn = !!token
        },
        setUser(state, user) {
            state.user = user
        },
        setAttendees(state, attendees) {
            state.attendees = attendees
        },
        updateAttendeeStatus(state, data) {
            state.attendees[data.index].status = data.status
        },
        removeAttendeeByIndex(state, index){
            state.attendees.splice(index,1)
        }
    },
    actions: {
        persistedLogin({commit}, data) {
            commit('setToken', data.token)
            commit('setUser', data.user)
        },
        logout({commit}) {
            commit('setToken', null)
            commit('setUser', null)
            commit('setAttendees', [])
        },
        setAttendees({commit}, attendees) {
            commit('setAttendees', attendees)
        },
        updateAttendeeStatus({commit}, data) {
            commit('updateAttendeeStatus', data)
        },
        cancelRegistration({commit}, index){
            commit('removeAttendeeByIndex', index)
        }
    }
})