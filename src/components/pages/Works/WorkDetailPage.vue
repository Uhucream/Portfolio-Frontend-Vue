<template functional>
  <v-container style="height: calc(100% - 44px)">
    <v-breadcrumbs :items="$options.crumbsItem(props)" class="pt-1 pl-2">
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
          {{ props.work_detail_data.name }}
        </p>
      </v-card-title>
      <template v-if="props.work_detail_data.work_url">
        <v-card-subtitle>
          <div>
            リンク: <a :href="props.work_detail_data.work_url" ref="noopener noreferrer" target="_blank">{{ props.work_detail_data.work_url}}</a>
          </div>
        </v-card-subtitle>
      </template>

      <v-row justify="center">
        <v-col cols="9">
          <template v-if="props.work_detail_data.work_picture_url">
            <v-img
              :src="props.work_detail_data.work_picture_url"
              :lazy-src="require('@/assets/NO_IMAGE_AVAILABLE.png')"
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
        v-html="props.work_detail_data.description"
        class="pt-6 mx-3 mx-sm-5"
      />
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'works-detail-page',
  props: {
    work_detail_data: Object
  },
  crumbsItem (props) {
    return [
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
        text: props.work_detail_data.name,
        disabled: true,
        to: `/daily_reports/post/${props.work_detail_data.endpoint_uri}`
      }
    ]
  }
}
</script>

<style scoped>
  .bodyContent {
    height: 100%;
    padding: 0;
  }
</style>
