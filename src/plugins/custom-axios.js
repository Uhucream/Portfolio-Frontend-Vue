import axios from 'axios'

export default {
  install (vue) {
    vue.prototype.$axios = axios.create({
      baseURL: process.env.VUE_APP_API_ENDPOINT
    })
  }
}
