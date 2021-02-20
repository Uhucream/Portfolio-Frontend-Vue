<template>
  <v-container
    fluid
  >
    <v-breadcrumbs :items="crumbsItem" class="pt-1 pl-2">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="bodyContent">
      <v-card
        dark
        class="pa-3"
        height="100%"
      >
        <v-row>
          <v-col
            sm="5"
          >
            <v-card-title class="pl-1 py-3 pl-sm-4 py-sm-4">
              <div>
                <p class="display-1 text--primary">
                  災害マップ
                </p>
              </div>
            </v-card-title>
            <v-img
              contain
              src="https://imgur.com/W42WHzk.png"
              lazy-src="https://imgur.com/W42WHzk.png"
              class="grey lighten-2 mx-1 mx-sm-4"
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
            <v-card-text class="pl-0">
              <div>
                リンク: <a href="https://project-design-team-a2.web.app">https://project-design-team-a2.web.app</a>
              </div>
            </v-card-text>
          </v-col>
          <v-col
            sm="7"
          >
            <v-card-text class="pt-0">
              <div>
                <div class="pt-6">
                  <p class="display-1 text--primary">
                    使用したもの
                  </p>
                  <div>
                    <a href="https://jp.vuejs.org/index.html" style="text-decoration:none;" target="_blank" rel="noopener noreferrer">
                      <v-icon size="28px" color="#41B833">mdi-vuejs</v-icon>
                    </a>
                    <a href="https://vuetifyjs.com/en/" style="text-decoration:none;" target="_blank" rel="noopener noreferrer">
                      <v-icon size="28px" color="#88BEF2">mdi-vuetify</v-icon>
                    </a>
                    <a href="https://firebase.google.com" style="text-decoration:none;" target="_blank" rel="noopener noreferrer">
                      <v-icon size="28px" color="#FFCB2B">mdi-firebase</v-icon>
                    </a>
                    <a href="https://www.mapbox.com" style="text-decoration:none;" target="_blank" rel="noopener noreferrer">
                      <v-icon size="28px" color="#4264FB">mdi-mapbox</v-icon>
                    </a>
                  </div>
                  <ul class="pl-8 py-2 body-1">
                    <li>フロントエンド: Vue</li>
                    <li>バックエンド: Flask</li>
                    <li>サービス: Firebase Hosting, Realtime Database, Heroku, Mapbox Education</li>
                  </ul>
                </div>
                <p class="display-1 text--primary">
                  解説
                </p>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'daily-report-page',
  data () {
    return {
      crumbsItem: [
        {
          text: 'Top',
          disabled: false,
          to: '/'
        },
        {
          text: 'Daily Reports',
          disabled: false,
          to: '/daily_reports/posts'
        },
        {
          text: `# ${this.$route.params['id']}`,
          disabled: true,
          to: `/daily_reports/post/${this.$route.params['id']}`
        }
      ]
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .bodyContent {
    height: 100%;
    padding: 0;
  }
</style>
