import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import {sync} from 'vuex-router-sync'
import store from './store/store'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify)

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
