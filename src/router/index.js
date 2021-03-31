import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import TopPage from '@/components/pages/TopPage'
import WorksList from '@/components/pages/Works/WorksList'
import WorkDetailPage from '@/components/pages/Works/WorkDetailPage'
import AboutMe from '@/components/pages/AboutMe'
import DailyReportsList from '@/components/pages/DailyReport/DailyReportsList'
import DailyReportPage from '@/components/pages/DailyReport/DailyReportPage'
import CreateNewPost from '@/components/pages/DailyReport/CreateNewPost'
import EditPost from '@/components/pages/DailyReport/EditPost'
import Login from '@/components/pages/Login'

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
      path: '/my_work/detail/:endpoint_uri',
      name: 'WorkDetailPage',
      component: WorkDetailPage
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
      path: '/daily_reports/post/:id',
      name: 'DailyReportPage',
      component: DailyReportPage
    },
    {
      path: '/daily_reports/posts/new',
      name: 'CreateNewPost',
      component: CreateNewPost,
      meta: { requireAuth: true }
    },
    {
      path: '/daily_reports/post/:id/edit',
      name: 'EditPost',
      component: EditPost,
      meta: { requireAuth: true }
    },
    {
      path: '/about_me',
      name: 'AboutMe',
      component: AboutMe,
      meta: {
        title: 'About Me'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 })
        }, 500)
      })
    } else {
      return { x: 0, y: 0 }
    }
  }
})

const api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  xsrfHeaderName: 'X-CSRF-TOKEN',
  withCredentials: true
})

router.beforeEach((to, from, next) => {
  async function authCheck () {
    const result = await api
      .get('/auth/protected', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': Vue.$cookies.get('csrf_access_token')
        }
      })
      .then((_) => {
        return true
      })
      .catch((_) => {
        return false
      })
    return result
  }
  const navigationGuard = async () => {
    await authCheck().then((result) => {
      if (
        result ||
        !to.matched.some(
          (record) => record.meta.requireAuth && record.path !== '/login'
        )
      ) {
        next()
      } else {
        next({ path: '/login', query: { backuri: to.fullPath } })
      }
    })
  }
  navigationGuard()
})
