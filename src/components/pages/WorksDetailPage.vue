<template>
  <v-container
    fluid
    style="height: 100%"
  >
    <div class="bodyContent">
      <v-card
        dark
        flat
        class="pa-3"
        height="100%"
      >
        <v-col
          md="5"
          sm="12"
        >
          <v-img
            contain
            src="https://imgur.com/W42WHzk.png"
          />
        </v-col>
        <v-col
          md="5"
          sm="12"
          class="pt-1 pl-1"
        >
          <v-card-text class="pt-0">
            <v-breadcrumbs :items="crumbsItem" class="pl-1">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
            <div>
              <p class="display-1 text--primary">
                災害マップ
              </p>
              <div class="pl-2">
                リンク: <a href="https://project-design-team-a2.web.app">https://project-design-team-a2.web.app</a>
              </div>
            </div>
          </v-card-text>
        </v-col>
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
          href: '/'
        },
        {
          text: 'My Works',
          disabled: true,
          href: 'works_detail'
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
