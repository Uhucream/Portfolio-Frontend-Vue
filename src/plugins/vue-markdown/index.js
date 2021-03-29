const mdOptions = {
  breaks: true,
  html: true,
  linkify: true
}
var md = require('markdown-it')(mdOptions)
const checkboxOptions = {
  divWrap: true
}
md.use(require('markdown-it-checkbox'), checkboxOptions).use(require('markdown-it-sanitizer')).use(require('markdown-it-mdi'))

export default {
  install (vue) {
    vue.prototype.$md = md
  }
}
