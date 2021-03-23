<template>
  <v-app>
    <v-app-bar
      app
      color='blue-grey darken-2'
      dark
    >
      <!-- <a to="/"> -->
        <!-- <v-toolbar-title class="ml-1"><router-link style="text-decoration: none" class="white--text" to="/">Takashi</router-link></v-toolbar-title> -->
        <router-link to="/" custom v-slot="{ navigate }">
          <v-toolbar-title class="ml-1" :style="{'cursor': $route.path !== '/' ? 'pointer' : 'initial'}" @click="navigate" role="link">
            Takashi
          </v-toolbar-title>
        </router-link>
      <!-- </a> -->
      <v-spacer></v-spacer>
      <v-btn
        v-if="!isLoggedIn && showLoginBtn"
        text
        to="/login"
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
      <v-btn
        href="https://github.com/Uhucream"
        target="_blank"
        rel="noopener noreferrer"
        link
        icon
        depressed
        :ripple="false"
      >
        <v-icon
          class="px-2"
        >
          mdi-github-circle
        </v-icon>
      </v-btn>
      <v-btn
        href="https://www.instagram.com/cattle19_59.tym.pictures"
        target="_blank"
        rel="noopener noreferrer"
        link
        icon
        depressed
        :ripple="false"
      >
        <v-icon
          class="px-2"
        >
          mdi-instagram
        </v-icon>
      </v-btn>
      <v-btn
        href="https://twitter.com/UKokkei95Toyama"
        target="_blank"
        rel="noopener noreferrer"
        link
        icon
        depressed
        :ripple="false"
      >
        <v-icon>
          {{ mdiTwitter }}
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
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
import { mdiTwitter } from '@mdi/js'
export default {
  name: 'App',
  data () {
    return {
      mdiTwitter: mdiTwitter,
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
            standBy = true
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
    reload () {
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },
    authCheck () {
      this.$axios.get('/auth/protected', {
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': this.$cookies.get('csrf_access_token')
        }
      })
        .then(_ => {
          this.isLoggedIn = true
        })
        .catch(_ => {
          this.isLoggedIn = false
        })
    },
    async logout () {
      await this.$axios.delete('/auth/logout', {
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': this.$cookies.get('csrf_access_token')
        }
      })
        .then(_ => {
          this.reload()
        })
        .catch(_ => {
        })
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
