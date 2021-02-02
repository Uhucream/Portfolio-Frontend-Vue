<template>
  <v-app>
    <v-app-bar
      app
      color='blue-grey darken-2'
      dark
    >
      <v-toolbar-title class="ml-1" @click="$router.push('/')">Takashi</v-toolbar-title>
      <v-spacer></v-spacer>
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
        href="https://www.instagram.com/cattle19_59.tym.jp"
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
      mdiTwitter: mdiTwitter
    }
  }
}
</script>
