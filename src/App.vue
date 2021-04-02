<template>
  <v-app>
    <v-app-bar
      app
      color='blue-grey darken-2'
      dark
    >
      <router-link to="/" custom v-slot="{ navigate }">
        <v-toolbar-title class="ml-1" :style="{'cursor': $route.path !== '/' ? 'pointer' : 'initial'}" @click="navigate" role="link">
          Takashi
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!isLoggedIn && showLoginBtn && $route.path !== '/login'"
        text
        @click="goLoginPage"
      >
        Login
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        text
        @click="logout"
      >
        Logout
      </v-btn>
      <a
        style="text-decoration: none;"
        href="https://github.com/Uhucream"
        ref="noopener noreferrer"
        target="_blank"
      >
        <v-icon
          class="mx-3"
        >
          mdi-github-circle
        </v-icon>
      </a>
      <a
        style="text-decoration: none;"
        href="https://www.instagram.com/cattle19_59.tym.pictures"
        ref="noopener noreferrer"
        target="_blank"
      >
        <v-icon
          class="mx-3"
        >
          mdi-instagram
        </v-icon>
      </a>
      <a
        style="text-decoration: none;"
        href="https://twitter.com/UKokkei95Toyama"
        ref="noopener noreferrer"
        target="_blank"
      >
        <v-icon
          class="ml-3"
        >
          mdi-twitter
        </v-icon>
      </a>
    </v-app-bar>

    <v-main>
      <v-fade-transition>
        <router-view/>
      </v-fade-transition>
    </v-main>
    <v-footer
      color="transparent"
    >
      <v-col
        class="text-center caption"
        cols="12"
      >
        {{ new Date().getFullYear() }} <strong>Takashi Ushikoshi</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      showLoginBtn: false,
      isLoggedIn: false,
      createPath: null,
      index: 0
    }
  },
  methods: {
    showLogin (event) {
      if (!['/daily_reports/posts/new', '/login'].includes(this.$route.path) && !this.isLoggedIn) {
        var waitingTime = 1500
        var standBy = true
        var command = JSON.parse(process.env.VUE_APP_LOGIN_SHORTCUT)
        var length = command.length
        var timer = null

        clearTimeout(timer)
        if (standBy && event.keyCode === command[this.index]) {
          this.index++
          if (this.index >= length) {
            standBy = false
            this.index = 0

            this.showLoginBtn = true
            setTimeout(function () {
              this.showLoginBtn = false
              standBy = true
            }.bind(this), waitingTime)
          } else {
            timer = setTimeout(function () {
              this.index = 0
            }, waitingTime)
          }
        } else {
          this.index = 0
        }
      }
    },
    goLoginPage () {
      if (this.$route.path === '/') {
        this.$router.push({ path: '/login' })
      } else {
        this.$router.push({ path: '/login', query: { backuri: this.$router.currentRoute.path } })
      }
    },
    reload () {
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },
    async authCheck () {
      await this.$axios
        .get(
          '/auth/protected',
          {
            withCredentials: true,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRF-TOKEN': this.$cookies.get('csrf_access_token')
            }
          }
        )
        .then(() => {
          this.isLoggedIn = true
        })
        .catch(() => {
          this.isLoggedIn = false
        })
    },
    async logout () {
      await this.$axios
        .delete('/auth/logout', {
          withCredentials: true,
          xsrfHeaderName: 'X-CSRF-TOKEN',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': this.$cookies.get('csrf_access_token')
          }
        })
        .then(() => {
          this.reload()
        })
        .catch(() => {
        })
    }
  },
  watch: {
    $route: function () {
      this.authCheck()
    }
  },
  created () {
    this.authCheck()
  },
  mounted () {
    this.createPath = process.env.VUE_APP_CREATE_POST_PAGE
    window.addEventListener('keyup', this.showLogin, false)
  },
  destroyed () {
    window.removeEventListener('keyup', this.showLogin, false)
  }
}
</script>

<style scoped>
  .appAlert {
    z-index: 1;
    position: absolute;
    top: calc(56px + 2vh);
    right: 0px;
  }
</style>
