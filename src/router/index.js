import Vue from 'vue'
import Router from 'vue-router'
import { api } from '@/plugins/custom-axios'
import { md } from '@/plugins/vue-markdown'
import TopPage from '@/components/pages/TopPage'
import WorksList from '@/components/pages/Works/WorksList'
import DailyReportsList from '@/components/pages/DailyReport/DailyReportsList'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TopPage',
      component: TopPage
    },
    {
      path: '/my_works',
      name: 'WorksList',
      component: WorksList,
      meta: {
        title: 'My Works'
      }
    },
    {
      path: '/my_works/detail/:endpoint_uri',
      name: 'WorkDetailPage',
      component: () => import('@/components/pages/Works/WorkDetailPage'),
      props: true,
      beforeEnter: (to, from, next) => {
        if (!to.params.work_detail_data) {
          api
            .get(
              `/v1/my_work/${to.params.endpoint_uri}`
            )
            .then((response) => {
              to.params.work_detail_data = response.data
              to.params.work_detail_data.description = md.render(
                response.data.description
              )
              to.meta.title = `${response.data.name} - My Works`
              next()
            })
        } else {
          to.meta.title = to.params.title
          next()
        }
      }
    },
    {
      path: '/daily_reports/posts',
      name: 'DailyReportsList',
      component: DailyReportsList,
      meta: {
        title: 'Daily Reports'
      }
    },
    {
      path: '/daily_reports/posts/:id',
      name: 'DailyReportPage',
      component: () => import('@/components/pages/DailyReport/DailyReportPage'),
      props: true,
      beforeEnter: (to, from, next) => {
        if (!to.params.report_content_data) {
          api
            .get(`/v1/post/${to.params.id}`)
            .then((response) => {
              to.params.report_content_data = response.data
              to.meta.title = `#${to.params.id} ${response.data.title}`
              next()
            })
        } else {
          to.meta.title = to.params.title
          next()
        }
      }
    },
    {
      path: '/daily_reports/posts/new',
      name: 'CreateNewPost',
      component: () => import('@/components/pages/DailyReport/CreateNewPost'),
      meta: { requireAuth: true }
    },
    {
      path: '/daily_reports/posts/:id/edit',
      name: 'EditPost',
      component: () => import('@/components/pages/DailyReport/EditPost'),
      meta: { requireAuth: true }
    },
    {
      path: '/about_me',
      name: 'AboutMe',
      component: () => import('@/components/pages/AboutMe'),
      meta: {
        title: 'About Me'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/pages/Login'),
      meta: {
        title: 'Login'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 })
        }, 500)
      })
    }
  }
})

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requireAuth && record.path !== '/login')) {
    next()
  } else {
    api
      .get(
        '/auth/protected',
        {
          withCredentials: true,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': Vue.$cookies.get('csrf_access_token')
          }
        }
      )
      .then(() => {
        next()
      })
      .catch(() => {
        next({ name: 'Login', query: { backuri: to.fullPath } })
      })
      .finally(() => {
      })
  }
})

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | Takashi's Portfolio`
  } else {
    document.title = 'Takashi\'s Portfolio'
  }
})
