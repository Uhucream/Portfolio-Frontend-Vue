// ダークモードとライトモードの切替時にアニメーションできるコンポーネント (ダーク用とライト用の画像が必要)
<template functional>
  <v-img
    :src="props.light_img"
    :lazy-src="require('@/assets/NO_IMAGE_AVAILABLE.png')"
    v-bind="props.v_img_props"
  >
    <v-fade-transition>
      <div v-show="props.system_is_dark" style="display: flex; position: absolute; top: 0;">
        <v-img
          :src="props.dark_img"
          :lazy-src="require('@/assets/NO_IMAGE_AVAILABLE.png')"
          v-bind="props.v_img_props"
        />
      </div>
    </v-fade-transition>
  </v-img>
</template>

<script>
export default {
  name: 'switchable-image',
  props: {
    system_is_dark: Boolean,
    light_img: null,
    dark_img: null,
    v_img_props: Object
  }
}
</script>
