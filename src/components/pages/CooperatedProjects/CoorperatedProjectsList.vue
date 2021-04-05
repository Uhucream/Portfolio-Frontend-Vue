<template>
  <v-container>
    <BreadCrumbs
      :path="pathList"
    />

    <v-col
      :cols="(12 / itemsPerRow)"
    >
      <v-card>
        <v-img
          src="https://pbs.twimg.com/profile_banners/1164807385816260608/1566551099/1500x500"
          :lazy-src="require('@/assets/NO_IMAGE_AVAILABLE.png')"
          height="110"
          gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.4)"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey darken-2"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card-title>ICリーダー</v-card-title>
        <v-card-subtitle class="text-caption">by <a href="https://twitter.com/kawamuramura_s?s=20" style="text-decoration: none;">Shintaro Kawamura</a>, <a href="https://twitter.com/NobtakaJP?s=20" style="text-decoration: none;">Nobtaka Nukui</a></v-card-subtitle>
        <v-card-text>
          <div
            class="text-body-1 text--primary"
          >
            iPhoneで交通系ICカードなどの残高確認ができるアプリです。
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="blue-grey lighten-1"
            :to="{ name: 'CooperatedProjectPage' }"
          >
            詳しい情報
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import BreadCrumbs from '@/components/modules/BreadCrumbs'
export default {
  name: 'worksDetailPage',
  components: {
    BreadCrumbs
  },
  data () {
    return {
      pathList: [
        {
          text: 'Cooperated Projects',
          to: { name: 'CooperatedProjectsList' }
        }
      ]
    }
  },
  computed: {
    ssUrl: function () {
      if (this.$vuetify.theme.isDark === true) {
        return 'https://i.imgur.com/rGwUpVS.png'
      } else {
        return 'https://i.imgur.com/P1fpoqU.png'
      }
    },
    itemsPerRow () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 1
        case 'sm': return 2
        case 'md': return 3
        case 'lg': return 4
        case 'xl': return 6
      }
    }
  }
}
</script>

<style scoped>
  .bodyContent {
    height: 100%;
    padding: 0;
  }
</style>
