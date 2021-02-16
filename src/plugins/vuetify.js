import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const systemDarkModeBool = window.matchMedia('(prefers-color-scheme: dark)')

const opts = {
  theme: {
    dark: systemDarkModeBool.matches
  }
}

export default new Vuetify(opts)
