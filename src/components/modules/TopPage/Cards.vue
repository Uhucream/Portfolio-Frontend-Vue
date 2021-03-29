<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="4"
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
              to="/about_me"
            >
              詳しい情報
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
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
  },
  computed: {
    introductionMaxWidth: function () {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return undefined
      } else {
        return '275px'
      }
    }
  }
}
</script>
