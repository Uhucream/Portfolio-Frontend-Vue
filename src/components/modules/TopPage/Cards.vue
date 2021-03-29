<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="4"
        lg="3"
      >
        <v-subheader>About Me</v-subheader>
        <v-card>
          <v-img
            :src="require('@/assets/WWDC.png')"
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
          <v-card-title>
            <p class="mt-1 display-1 text--primary">
              自己紹介
            </p>
          </v-card-title>
          <v-card-text>
            <div class="text-body-1 text--primary">
              金沢工業大学 2年 情報工学科の学生です。
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="blue-grey lighten-1"
              to="/about_me"
            >
              詳しい情報
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="8"
        lg="9"
      >
        <v-subheader>My Works</v-subheader>
        <WorksList
          :isTopPage="isTopPage"
        />
      </v-col>

      <v-col
        cols="12"
      >
        <v-subheader>Daily Reports</v-subheader>
        <DailyReportsList
          :isTopPage="isTopPage"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorksList from '@/components/pages/Works/WorksList'
import DailyReportsList from '@/components/pages/DailyReport/DailyReportsList'
export default {
  name: 'top-page-cards',
  components: {
    WorksList,
    DailyReportsList
  },
  data () {
    return {
      isTopPage: true
    }
  }
}
</script>
