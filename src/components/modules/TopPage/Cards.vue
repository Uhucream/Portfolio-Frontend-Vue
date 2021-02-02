<template>
  <v-container>
    <v-row>
      <v-col
        sm="6"
      >
        <v-subheader>My Works</v-subheader>
        <v-card>
          <v-img
            class="white--text align-end"
            src="https://imgur.com/W42WHzk.png"
            lazy-src="https://imgur.com/W42WHzk.png"
            gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.4)"
          >
            <v-card-title>災害マップ</v-card-title>
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
            <div class="text--primary" style="padding-top: 2px">
              大学の「プロジェクトデザイン実践」という授業で作った成果物です。<br>
              概要、および実物へのリンクは下記リンクより詳細ページをご覧ください。
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="blue-grey lighten-1"
              to="/works_detail"
            >
              詳しい情報
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>

      <v-col
        sm="6"
      >
        <v-subheader>About Me</v-subheader>
        <v-card>
          <v-card-text>
            <p class="mt-1 display-1 text--primary">
              自己紹介
            </p>
            <div class="text--primary">
              金沢工業大学 2年 情報工学科の学生です。
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="blue-grey lighten-1"
              to="/introduction"
            >
              詳しい情報
            </v-btn>
          </v-card-actions>
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
            <p class="display-1 text--primary mt-1">
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'topPageCards'
}
</script>
