import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Timeline from '@/components/timeline/Timeline'
import Profile from '@/components/edit/Profile'
import Registration from '@/components/auth/Registration'
import Login from '@/components/auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      component: Home,
      props: false
    },
    {
      path: '/profile',
      component: Profile,
      props: true
    },
    {
      path: '/login',
      component: Login,
      props: false
    },
    {
      path: '/registration',
      component: Registration,
      props: false
    },
    {
      path: '/timeline',
      component: Timeline,
      props: true
    }
  ]
})
