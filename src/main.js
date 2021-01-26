// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18next from 'i18next'
import VueI18Next from '@panter/vue-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json'

Vue.use(VueI18Next)

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
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
