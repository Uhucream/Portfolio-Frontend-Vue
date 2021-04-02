import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT
})

export default {
  install (vue) {
    vue.prototype.$axios = api
  }
}
