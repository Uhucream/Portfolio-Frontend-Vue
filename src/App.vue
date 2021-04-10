<template>
  <v-app>
    <v-app-bar
      app
      color='blue-grey darken-2'
      dark
    >
      <v-toolbar-title class="ml-1">
        <router-link :to="{ name: 'TopPage' }">
          Takashi
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!isLoggedIn && showLoginBtn && $route.name !== 'Login'"
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
      <v-container v-if="$route.name !== 'TopPage'" class="pb-1">
        <BreadCrumbs
          :path="pathList"
        />
      </v-container>
      <keep-alive>
        <v-fade-transition
          mode="out-in"
        >
          <router-view/>
        </v-fade-transition>
      </keep-alive>
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
  components: {
    BreadCrumbs: () => (import('@/components/modules/BreadCrumbs'))
  },
  data () {
    return {
      pathList: [],
      showLoginBtn: false,
      isLoggedIn: false,
      createPath: null,
      index: 0
    }
  },
  methods: {
    generateCrumbs () {
      if (this.pathList.length !== 0) {
        this.pathList.splice(0, this.pathList.length)
      }
      const textDecide = (route) => {
        if (route.meta.pathText) {
          this.pathList.push(
            {
              text: route.meta.pathText,
              to: { path: route.path }
            }
          )
        } else {
          this.pathList.push(
            {
              text: route.meta.title,
              to: { path: route.path }
            }
          )
        }
      }
      const matchedRoute = this.$route.matched
      const loopCount = matchedRoute.length
      for (var i = 0; i < loopCount; i++) {
        if (i + 1 === loopCount) {
          textDecide(this.$route)
        } else {
          textDecide(matchedRoute[i])
        }
      }
    },
    showLogin (event) {
      if (!['CreateNewPost', 'Login'].includes(this.$route.name) && !this.isLoggedIn) {
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
            timer = setTimeout(() => {
              this.showLoginBtn = false
              standBy = true
            }, waitingTime)
          } else {
            timer = setTimeout(() => {
              this.index = 0
            }, waitingTime)
          }
        } else {
          this.index = 0
        }
      }
    },
    goLoginPage () {
      if (this.$route.name === 'TopPage') {
        this.$router.push({ name: 'Login' })
      } else {
        this.$router.push({ name: 'Login', query: { backuri: this.$router.currentRoute.path } })
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
      this.generateCrumbs()
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
  a.router-link-active {
    text-decoration: none;
    color: inherit;
  }
  a.router-link-exact-active {
    cursor: default;
    pointer-events: none;
  }
</style>
