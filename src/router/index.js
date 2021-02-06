import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/pages/TopPage'
import WorksDetailPage from '@/components/pages/WorksDetailPage'
import AboutMe from '@/components/pages/AboutMe'
import DailyReportsList from '@/components/pages/DailyReport/DailyReportsList'
import DailyReportPage from '@/components/pages/DailyReport/DailyReportPage'
import Parser from '@/components/modules/Markdown/Parser'

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
    },
    {
      path: '/daily_reports/posts',
      name: 'DailyReportsList',
      component: DailyReportsList
    },
    {
      path: '/daily_reports/post/:id',
      name: 'DailyReportPage',
      component: DailyReportPage
    },
    {
      path: '/about_me',
      name: 'AboutMe',
      component: AboutMe
    },
    {
      path: '/test',
      name: 'Parser',
      component: Parser
    }
  ]
})
