<template>
  <v-app id="app">
    <v-app-bar
     app
     color='black'
     dark
     flat
    >
      <v-toolbar-title class="ml-1">Takashi</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/Uhucream"
        target="_blank"
        link
        icon
        depressed
        :ripple="false"
      >
        <v-icon
          class="px-2"
        >
          mdi-github-circle
        </v-icon>
      </v-btn>
      <v-btn
        href="https://www.instagram.com/cattle19_59.tym.jp"
        target="_blank"
        link
        icon
        depressed
        :ripple="false"
      >
        <v-icon
          class="px-2"
        >
          mdi-instagram
        </v-icon>
      </v-btn>
      <v-btn
        href="https://twitter.com/UKokkei95Toyama"
        target="_blank"
        link
        icon
        depressed
        :ripple="false"
      >
        <v-icon>
          {{ mdiTwitter }}
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-carousel
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
        cycle
        height="400px"
      >
        <v-carousel-item
          v-for="(item,i) in carouselItems"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <v-container fluid>
        <v-list
          flat
          class="tile"
        >
          <v-subheader>About Me</v-subheader>
          <v-row>
            <v-col>
              <v-card>
                <v-card-text>
                  <div>Word of the Day</div>
                  <p class="display-1 text--primary">
                    el·ee·mos·y·nar·y
                  </p>
                  <p>adjective</p>
                  <div class="text--primary">
                    relating to or dependent on charity; charitable.<br>
                    "an eleemosynary educational institution."
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="teal accent-4"
                    @click="reveal = true"
                  >
                    Learn More
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <v-card
                    v-if="reveal"
                    class="transition-fast-in-fast-out v-card--reveal"
                    style="height: 100%;"
                  >
                    <v-card-text class="pb-0">
                      <p class="display-1 text--primary">
                        Origin
                      </p>
                      <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
                    </v-card-text>
                    <v-card-actions class="pt-0">
                      <v-btn
                        text
                        color="teal accent-4"
                        @click="reveal = false"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-expand-transition>

              </v-card>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-subheader>My works</v-subheader>
          <v-row>
            <v-col>
              <v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mdiTwitter } from '@mdi/js'
export default {
  name: 'topPage',
  data () {
    return {
      mdiTwitter: mdiTwitter,
      carouselItems: [
        {
          src: 'https://lh3.googleusercontent.com/pw/ACtC-3dethR4ungoJiKTTxDZMx3IPMCFgBu-epL066EznDpmKV4JV1KZSRHpByBTMfj5e_hD8YpTvBSwLyWZs7i2qJ_jzgBwIx_uP1byuaw-U8Vl4An5tI7qywpvuhQquQvcAX30zVR0gLyP5Hdp3MyrkCtvNQ=s0'
        },
        {
          src: 'https://lh3.googleusercontent.com/pw/ACtC-3eCM_yJQ6-bvBX9IGgAmbzD4dMDaCDybDH47hxUH9l6zfo3zwzrZxj7dLNLilV2MqSkGq9yFZTJvDUDToMoWMVnFvmB0RDHEM2iL1GdwcO7kOTJp5tzvO9ljq2H0h-erhnnfn5ZxkA3xZ9VtMMOFQWrew=s0'
        },
        {
          src: 'https://lh3.googleusercontent.com/pw/ACtC-3chRUQ6r2UAnU3xVXYmB1ySfG6pSJC_DeXil7ykFSBleq0fP6_uc2pNFeK11VyBo2yfp5D5t8jftqP2JzQ_vqE7hMqgS07Whj_RXgikEli_9m48fwN3KeEoXuekyRO8RhrDsixPWJeJaxe7_dL0Kny_lw=s0'
        },
        {
          src: 'https://lh3.googleusercontent.com/pw/ACtC-3d0cMieyC5qvR9JTFUXH8UkeRpoTwAexxp74TGaige2Rg-S1WL8dDoXms798DUiprXfdJf-r-cxEf4hJE4FAt6mcEI7z7rdehuNMrPfa03ttPW8x_B7gG1SmhO8cid_BweFApns43YzCK64chg-Lvyt9g=s0'
        }
      ]
    }
  }
}
</script>>
