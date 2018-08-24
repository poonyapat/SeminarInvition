import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import MyRegistered from './views/MyRegistered.vue'
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
      path: '/registered_seminar',
      name: 'myRegistered',
      component: MyRegistered
    },
    {
      path: '/browse',
      name: 'browse',
      component: Browse
    }
  ]
})
