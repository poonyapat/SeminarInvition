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
        isUserLoggedIn: false
    },
    mutations: {
        setToken(state, token){
            state.token = token
            state.isUserLoggedIn = !!token
        },
        setUser(state, user){
            state.user = user
        }
    },
    actions: {
        persistedLogin({commit}, data){
            commit('setToken', data.token)
            commit('setUser', data.user)
        },
        logout({commit}){
            commit('setToken', null)
            commit('setUser',null)
        }
    }
})