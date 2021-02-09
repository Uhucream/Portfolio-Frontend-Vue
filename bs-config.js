const get = require('lodash/get')

module.exports = {
  ui: {
    port: 3001,
    weinre: {
      port: 8080
    }
  },
  files: ['**/public/*'],
  watchOptions: {
    usePolling: true
  },
  server: false,
  proxy: {
    target: 'docker-server.host-only'
  },
  port: 8000,
  logPrefix: 'BS',
  ghostMode: false
}
