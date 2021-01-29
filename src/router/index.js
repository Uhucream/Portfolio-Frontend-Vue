import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/pages/TopPage'
import WorksDetailPage from '@/components/pages/WorksDetailPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TopPage',
      component: TopPage
    },
    {
      path: '/works_detail',
      name: 'WorksDetailPage',
      component: WorksDetailPage
    }
  ]
})
