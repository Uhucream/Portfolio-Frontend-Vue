<template functional>
  <v-card>
    <v-img
      class="white--text align-end"
      :src="$options.workPictureURL(props.work_detail_data.work_picture_url)"
      :lazy-src="require('@/assets/NO_IMAGE_AVAILABLE.png')"
      gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.4)"
    >
      <v-card-title>{{ props.work_detail_data.name }}</v-card-title>
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
    <v-card-text>
      <div
        v-html="props.work_detail_data.top_page_outline"
        class="text-body-1 text--primary"
        style="padding-top: 2px"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="blue-grey lighten-1"
        :to="$options.goToDetailPage(props)"
      >
        詳しい情報
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { md } from '@/plugins/vue-markdown'
export default {
  name: 'works-card',
  props: {
    work_detail_data: Object
  },
  workPictureURL (url) {
    if (url) {
      return url
    } else {
      return require('@/assets/NO_IMAGE_AVAILABLE.png')
    }
  },
  goToDetailPage (props) {
    props.work_detail_data.description = md.render(props.work_detail_data.description)
    return {
      name: 'WorkDetailPage',
      params: {
        endpoint_uri: props.work_detail_data.endpoint_uri,
        work_detail_data: props.work_detail_data,
        title: `${props.work_detail_data.name} - My Works`
      }
    }
  }
}
</script>
