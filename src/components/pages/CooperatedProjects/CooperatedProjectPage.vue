<template>
  <v-container style="height: calc(100% - 44px);">
    <BreadCrumbs
      :path="pagePath"
    />

    <v-card
      class="pa-3 fill-height mx-auto"
      height="100%"
    >
      <v-card-title class="pl-1 py-3 pl-sm-4 py-sm-4">
        <p class="display-1">
          ICリーダー - 電子マネー残高確認アプリ
        </p>
      </v-card-title>
      <v-card-subtitle>
        <a
          href="https://onigiri.pizza/ic/index.html"
          ref="noopener noreferrer"
          target="_blank"
        >
          ICリーダー - 電子マネー残高確認アプリ
        </a>
      </v-card-subtitle>
      <v-card-subtitle class="py-0">
        Develped by: <a href="https://twitter.com/kawamuramura_s?s=20" style="text-decoration: none;">Shintaro Kawamura</a>
      </v-card-subtitle>
      <v-card-subtitle class="pt-0">
        Designed by: <a href="https://twitter.com/NobtakaJP?s=20" style="text-decoration: none;">Nobtaka Nukui</a>
      </v-card-subtitle>
      <v-container>
        <v-row justify="center">
          <v-col
            cols="10"
          >
            <v-img
              src="https://pbs.twimg.com/profile_banners/1164807385816260608/1566551099/1500x500"
              :lazy-src="require('@/assets/NO_IMAGE_AVAILABLE.png')"
              contain
            />
          </v-col>
        </v-row>
      </v-container>

      <div class="mt-2 mx-3 mx-sm-5">
        <v-divider/>
        <v-container>
          <v-row justify="center">
            <v-col>
              <v-sheet
                class="mx-auto"
                elevation="0"
                max-width="800px"
              >
                <v-slide-group
                  v-model="screenshotsList"
                  class="py-4"
                  show-arrows
                  center-active
                >
                  <v-slide-item
                    v-for="item in screenshotsList"
                    :key="item.orderNum"
                    class="ma-4"
                  >
                    <v-card
                      style="position: relative;"
                      max-width="150px"
                      flat
                    >
                      <SwitchableImage
                        :light_img="item.light"
                        :dark_img="item.dark"
                        :system_is_dark="$vuetify.theme.isDark"
                        :v_img_props="{'max-width': 150, contain: true}"
                      />
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

        <v-divider/>

        <v-container class="mt-2">
          <div class="mt-1">
            <h1>特徴</h1>
            <ul class="pl-8 my-2 text-body-1">
              <li>数多くの交通系ICカードや電子マネーICカードに対応</li>
              <li>
                履歴データはCSVに出力可能
              </li>
            </ul>
          </div>

          <div class="mt-1">
            <h1>開発協力させていただいた箇所</h1>
            <div class="text-body-1 pt-1 ml-2">
              <p style="text-indent: 1em">
                主に、石川県の北陸鉄道独自ICカードであるICaや、富山県の富山地方鉄道の独自ICカードであるecomyca関連を中心に開発協力させていただきました。
              </p>
              <p>ICaのバス停データ数は現時点(2021/04/05時点)ではおそらく、iOSのICカード読み取り系アプリでは一番のデータ数を誇っていると思います。</p>
              <p>
                また、現在でも全国交通系ICカードのデータベース更新を一部担当させていただいております。
              </p>
            </div>
            <ul class="ml-3 my-2 text-body-1">
              <li>北陸鉄道のICaのバス停データの収集</li>
              <li>
                ICaの履歴データのCSVエクスポート機能をICa向けに最適化
              </li>
              <li>
                ecomycaの購入、Kawamura氏への提供、および一部バス停データの追加
              </li>
            </ul>
          </div>

          <div class="mt-1">
            <h1>開発協力するに至った経緯</h1>
            <div class="text-body-1 pt-1 ml-2">
              <p style="text-indent: 1em">
                話は2019年まで遡ります。それまで、AppleはCoreNFCでFeliCaを読み取れるようにはしていませんでした。しかし、iOS 13からFeliCaが読み取れるようになるという噂をネットで見つけました。
                ICカード読み取り系アプリが出るのではと思い、2019年の夏頃から定期的に情報収集をしていたのですが、iOS 13リリース前からICカード読み取り系アプリのリリースを告知されていたのが<a href="https://twitter.com/treastrain?s=20" ref="noopener noreferrer" target="_blank">treastrain</a>氏によるJapan NFC Readerと、本アプリでした。
              </p>
              <p style="text-indent: 1em">
                iOS 13リリース後、僕は本アプリをインストールしましたが、当時は僕がよく利用しているICaに対応していませんでした。本アプリの公式Twitterアカウントに「ICaに対応して欲しい」というリプライを送らせていただいたのですが、「実券があれば対応可能です」という返信をいただきました。そこで、僕が公式Twitterアカウントの方に「実券を送るので対応していただきたいです」と送らせていただいたのが始まりです。
              </p>
            </div>
          </div>

          <div class="mt-1">
            <h1>開発協力によって得たもの</h1>
            <div class="text-body-1 pt-1 ml-2">
              <p style="text-indent: 1em"></p>
            </div>
          </div>
        </v-container>
      </div>

    </v-card>
  </v-container>
</template>

<script>
import BreadCrumbs from '@/components/modules/BreadCrumbs'
export default {
  name: 'works-detail-page',
  components: {
    BreadCrumbs,
    SwitchableImage: () => (import('@/components/modules/SwitchableImage'))
  },
  data () {
    return {
      pagePath: [
        {
          text: 'Cooperated Projects',
          to: { name: 'CooperatedProjectsList' }
        },
        {
          text: 'ICリーダー',
          to: { name: 'CooperatedProjectPage' }
        }
      ],
      screenshotsList: [
        {
          orderNum: 1,
          light: 'https://i.imgur.com/NPkL7ym.png',
          dark: 'https://i.imgur.com/kvLPxno.png'
        },
        {
          orderNum: 2,
          light: 'https://i.imgur.com/GFhqUbF.png',
          dark: 'https://i.imgur.com/wlz0SMS.png'
        },
        {
          orderNum: 3,
          light: 'https://i.imgur.com/N1GOsMz.png',
          dark: 'https://i.imgur.com/RQxrxxp.png'
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
