<template>
  <v-container>
    <v-breadcrumbs :items="crumbsItem" class="pt-1 pl-2">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="bodyContent">
      <v-card
        class="pa-3"
        height="100%"
      >
        <v-container>
          <v-row
            justify="center"
            align="center"
            class="mb-3 mx-a"
          >
            <v-col
              cols="4"
              sm="5"
            >
              <v-avatar
                style="margin-left: 3px;"
                :size="avatarSize"
              >
                <img
                  :src="require('@/assets/WWDC.png')"
                />
              </v-avatar>
            </v-col>
            <v-col
              cols="8"
              sm="7"
              class="pa-0"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h4 text-sm-h2">
                    牛越&emsp;嵩
                  </v-list-item-title>
                  <v-list-item-subtitle>Takashi Ushikoshi</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-container>

        <v-divider/>

        <div class="pa-5">
          <h1 class="pb-2">
            概要
          </h1>
          <p>
            <ul class="pb-2 text-body-1">
              <li>出身地: 北海道札幌市</li>
              <li>出身高校: 札幌光星中学・高等学校</li>
              <li>大学: 金沢工業大学</li>
              <li>趣味: 写真撮影、サイクリング</li>
            </ul>
          </p>
          <h1 class="pb-2">
            自己紹介
          </h1>
          <div class="text-body-1 justify-text">
            <p style="text-indent: 1em;">生まれ、育ちともに北海道札幌市です。</p>
            <p></p>
            <p style="text-indent: 1em;">中学のときから写真を撮ることが趣味で、最近はたまに気が向いたときに一眼か
            iPhone 12 Pro Maxで写真を撮ってます。トップページのカルーセルの写真はすべて僕が撮影したものです。</p>
            <p style="text-indent: 1em;">BEARTAILさんでバイトをさせていただいていることもあって、普段からSPA開発をしています。</p>
          </div>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'about-me',
  data () {
    return {
      crumbsItem: [
        {
          text: 'Top',
          disabled: false,
          to: '/'
        },
        {
          text: 'About Me',
          disabled: true,
          to: 'about_me'
        }
      ]
    }
  },
  computed: {
    avatarSize () {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return '96'
      } else {
        return '192'
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
