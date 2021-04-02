<template functional>
  <v-card>
    <v-img
      class="white--text align-end"
      :src="$options.workPictureURL(props.work_picture_url)"
      :lazy-src="require('@/assets/NO_IMAGE_AVAILABLE.png')"
      gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.4)"
    >
      <v-card-title>{{ props.work_name }}</v-card-title>
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
        v-html="props.top_page_outline"
        class="text-body-1 text--primary"
        style="padding-top: 2px"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="blue-grey lighten-1"
        :to="`/my_work/detail/${props.endpoint_uri}`"
      >
        詳しい情報
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'works-card',
  props: {
    work_name: String,
    work_picture_url: String,
    top_page_outline: String,
    endpoint_uri: String
  },
  workPictureURL (url) {
    if (url) {
      return url
    } else {
      return require('@/assets/NO_IMAGE_AVAILABLE.png')
    }
  }
}
</script>
