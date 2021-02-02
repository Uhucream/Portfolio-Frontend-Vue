<template>
  <v-container
    fluid
    style="height: 100%"
  >
    <div class="bodyContent">
      <v-card
        dark
        flat
        class="py-3 px-5"
        height="100%"
      >
        <v-row>
          <v-col
            sm="5"
          >
            <v-card-text class="pt-0 pl-0">
              <v-breadcrumbs :items="crumbsItem" class="pl-1">
                <template v-slot:divider>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-breadcrumbs>
              <div>
                <p class="display-1 text--primary">
                  災害マップ
                </p>
              </div>
            </v-card-text>
            <v-img
              contain
              src="https://imgur.com/W42WHzk.png"
              lazy-src="https://imgur.com/W42WHzk.png"
              class="grey lighten-2"
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
                <div class="py-5">
                  <p class="display-1 text--primary">
                    使用したもの
                    <ul class="pl-8 py-2 body-1">
                      <li>フロントエンド: Vue</li>
                      <li>バックエンド: Flask</li>
                      <li>サービス: Firebase Hosting, Realtime Database, Heroku, Mapbox Education</li>
                    </ul>
                  </p>
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
  name: 'worksDetailPage',
  data () {
    return {
      crumbsItem: [
        {
          text: 'Top',
          disabled: false,
          to: '/'
        },
        {
          text: 'My Works',
          disabled: true,
          to: 'works_detail'
        }
      ]
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
