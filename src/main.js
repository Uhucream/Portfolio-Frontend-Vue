// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from '@/router'
import vuetify from './plugins/vuetify'
import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import i18next from 'i18next'
import VueI18Next from '@panter/vue-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json'
import CustomAxios from '@/plugins/custom-axios'
import VueCookies from 'vue-cookies'
import VueMarkdown from '@/plugins/vue-markdown'

Vue.use(VueI18Next)
Vue.use(VueCookies)
Vue.use(vuetify)
Vue.use(CustomAxios)
Vue.use(VueMarkdown)

Vue.config.productionTip = false

i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      ja: { translation: ja }
    }
  })

const i18n = new VueI18Next(i18next)

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    vuetify.framework.theme.dark = e.matches
  })

viewportUnitsBuggyfill.init({ force: true })
window.addEventListener('resize', viewportUnitsBuggyfill.refresh, true)
