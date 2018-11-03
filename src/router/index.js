import Vue from 'vue'
import Router from 'vue-router'
import team from '@/components/team'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'team',
      component: team
    }
  ]
})
