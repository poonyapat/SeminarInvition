import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import {sync} from 'vuex-router-sync'
import store from './store/store'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    //purple
    // primary: colors.deepPurple.lighten1,
    // secondary: colors.deepPurple.lighten5,
    //red
    // primary: colors.red.accent4,
    // secondary: colors.red.lighten4
    //pink
    // primary: colors.pink.lighten3,
    // secondary: colors.pink.lighten5
    // cyan
    primary: colors.cyan.lighten1,
    secondary: colors.cyan.lighten4
    // black
    // primary: colors.grey.darken4,
    // secondary: colors.grey.lighten2
  }
})

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
