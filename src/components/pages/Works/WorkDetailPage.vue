<template>
  <v-container style="height: calc(100% - 44px)">
    <v-breadcrumbs :items="crumbsItem" class="pt-1 pl-2">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-card
      class="pa-3 fill-height"
      height="100%"
    >
      <v-card-title class="pl-1 py-3 pl-sm-4 py-sm-4">
        <p class="display-1">
          {{ workDetailData.name }}
        </p>
      </v-card-title>
      <template v-if="workDetailData.workURL">
        <v-card-subtitle>
          <div>
            リンク: <a :href="workDetailData.workURL">{{ workDetailData.workURL}}</a>
          </div>
        </v-card-subtitle>
      </template>

      <v-row justify="center">
        <v-col cols="9">
          <template v-if="workDetailData.workPictureURL">
            <v-img
              contain
              :src="workDetailData.workPictureURL"
              lazy-src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
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
          </template>

        </v-col>
      </v-row>

      <div
        v-html="workDetailData.description"
        class="pt-6 mx-3 mx-sm-5"
      />
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'works-detail-page',
  data () {
    return {
      workDetailData: {
        name: null,
        description: null,
        workURL: null,
        workPictureURL: null
      },
      crumbsItem: [
        {
          text: 'Top',
          disabled: false,
          to: '/'
        },
        {
          text: 'My Works',
          disabled: false,
          to: '/my_works'
        },
        {
          text: null,
          disabled: true,
          to: `/daily_reports/post/${this.$route.params['endpoint_uri']}`
        }
      ]
    }
  },
  methods: {
    async fetchWorkDetail () {
      await this.$axios
        .get(`/v1/my_work/${this.$route.params['endpoint_uri']}`)
        .then((response) => {
          this.reportFetchFailed = false
          this.$set(this.workDetailData, 'name', response.data.name)
          this.$set(this.workDetailData, 'description', response.data.description)
          this.$set(this.workDetailData, 'workURL', response.data.work_url)
          this.$set(this.workDetailData, 'workPictureURL', response.data.work_picture_url)

          this.$set(this.crumbsItem[2], 'text', response.data.name)
        })
    }
  },
  created () {
    this.fetchWorkDetail()
  }
}
</script>

<style scoped>
  .bodyContent {
    height: 100%;
    padding: 0;
  }
</style>
