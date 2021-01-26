const get = require('lodash/get');

module.exports = {
  ui: {
    port: 3001,
    weinre: {
      port: 8080
    }
  },
  files: ["src/**"],
  watchOptions: {
    usePolling: true
  },
  server: false,
  proxy: {
    target: 'docker-server.host-only'
  },
  port: 8000
};
