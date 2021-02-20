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
        class="pa-3"
        height="100%"
      >
        <v-card-text>
          <div class="ml-3 pt-3">
            <p class="display-1 text--primary">
              概要
            </p>
            <ul class="pb-2 body-1 text--primary">
              <li>出身地: 北海道札幌市</li>
              <li>出身高校: 札幌光星中学・高等学校</li>
              <li>大学: 金沢工業大学</li>
              <li>趣味: 写真撮影、サイクリング</li>
            </ul>
            <p class="display-1 text--primary">
              自己紹介
            </p>
            <div class="body-1 text--primary">
              &#9;生まれ、育ちともに北海道札幌市です。
              よく、「なぜ首都圏の大学を選ばなかったの？」と聞かれるのですが、富山が好きだったから、というのが端的な理由です。
              多いときでは一ヶ月に2回も行くほど重度の富山好きです。北陸で情報工学を学べる大学を探していて最終的に金沢工業大学を選びました。<br><br>
              &#9;中学のときから写真を撮ることが趣味で、最近はたまに気が向いたときに一眼か
              iPhone 12 Pro Maxで写真を撮ってます。トップページのカルーセルの写真はすべて僕が撮影したものです。<br><br>
              僕が生まれたときにはすでに実家のPCはすべてMacだったこともあり、重度のMac信者だったりします。
            </div>
          </div>
        </v-card-text>
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
  }
}
</script>

<style scoped>
  .bodyContent {
    height: 100%;
    padding: 0;
  }
</style>
