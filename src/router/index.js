import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Registration from '@/components/auth/Registration'
import Login from '@/components/auth/Login'
import Profile from '@/components/profile/Profile'
import Timeline from '@/components/timeline/Timeline'
import store from '@/store'

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
      path: '/registration',
      component: Registration,
      props: false
    },
    {
      path: '/login',
      component: Login,
      props: false
    },
    {
      path: '/profile',
      component: Profile,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path: '/timeline',
      component: Timeline,
      props: true,
      beforeEnter: AuthGuard
    }
  ]
})

function AuthGuard (from, to, next) {
  store.getters.isAuthenticated ? next() : next('/login')
}
