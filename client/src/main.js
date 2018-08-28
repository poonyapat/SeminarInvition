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
    // secondary: colors.deepPurple.lighten4,
    // red
    // primary: colors.red.accent4,
    // secondary: colors.red.lighten4,
    //pink
    // primary: colors.pink.lighten3,
    // secondary: colors.pink.lighten4,
    // cyan
    // primary: colors.cyan.lighten1,
    // secondary: colors.cyan.lighten4,
    // brown
    // primary: colors.brown.lighten1,
    // secondary: colors.brown.lighten4,
    // blue-yellow
    // primary: colors.indigo.darken4,
    // secondary: colors.amber.lighten4,

    // purple
    // primary: colors.pink.accent2,
    // secondary: colors.deepPurple.darken3,

    // black
    // primary: colors.grey.darken4,
    // secondary: colors.grey.lighten2,

    // black-pink
    primary: colors.grey.darken4,
    secondary: colors.pink.lighten4,

    // others
    cancel: colors.red.darken1,
    info: colors.blue.base,
    success: colors.green.darken1,
    edit: colors.orange.base,
    tertiary: '#ffe2eb',
  },
})

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
