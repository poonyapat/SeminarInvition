import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import {sync} from 'vuex-router-sync'
import store from './store/store'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    //purple
    // primary: '#7E57C2',
    // secondary: '#EDE7F6',
    //red
    // secondary: '#FFCDD2',
    // primary: '#D50000'
    //pink
    // primary: '#F48FB1',
    // secondary: '#FCE4EC'
    //orange
    // primary: '#FF3D00',
    // secondary: '#FFCCBC'
    // secondary: '#1A237E'
    // cyan
    primary: '#26C6DA',
    secondary: '#B2EBF2'
  }
})

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
