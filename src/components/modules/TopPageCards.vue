<template>
  <v-row>
    <v-col
      sm="6"
    >
      <v-subheader>My Works</v-subheader>
      <v-card>
        <v-img
          class="white--text align-end"
          src="https://imgur.com/W42WHzk.png"
          gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.4)"
        >
          <v-card-title>災害マップ</v-card-title>
        </v-img>
        <v-card-text>
          <div class="text--primary">
            relating to or dependent on charity; charitable.<br>
            "an eleemosynary educational institution."
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="blue-grey lighten-1"
            @click="reveal = true"
          >
            詳しい情報
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
                color="blue-grey lighten-1"
                @click="reveal = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-card>
    </v-col>
    <v-col
      sm="6"
    >
      <v-subheader>About Me</v-subheader>
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
            color="blue-grey lighten-1"
            @click="reveal = true"
          >
            詳しい情報
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
                color="blue-grey lighten-1"
                @click="reveal = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="4"
    >
      <v-subheader>Daily Reports</v-subheader>
      <v-card>
        <v-card-text>
          <div>2021/01/30</div>
          <p class="display-1 text--primary">
            プロゲートのSQL全修得
          </p>
          <div class="text--primary">
            今日、ようやくプロゲートのSQLの全コースを修了しまし...<br>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="blue-grey lighten-1"
            @click="reveal = true"
          >
            続きを読む
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
                color="blue-grey lighten-1"
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
</template>

<script>
export default {
  name: 'topPageCards'
}
</script>
