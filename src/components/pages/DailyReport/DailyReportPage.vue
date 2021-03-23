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
        <v-row>
          <v-col
            sm="5"
          >
            <v-col>
              <v-subheader>
                {{ $t('dailyReport.createdAt') }}: {{ dateFormatter(reportContent.createdAt) }}
              </v-subheader>
              <v-subheader v-if="reportContent.updatedAt != reportContent.createdAt">{{ $t('dailyReport.updatedAt') }}: {{ dateFormatter(reportContent.updatedAt) }}</v-subheader>
            </v-col>
            <v-card-title class="pl-1 py-3 pl-sm-4 py-sm-4">
              <div>
                <p class="display-1 text--primary">
                  {{ `#${$route.params['id']} ${reportContent.title}` }}
                </p>
              </div>
            </v-card-title>
            <v-card-text class="pl-0">
            </v-card-text>
          </v-col>
          <v-col
            sm="7"
          >
            <v-card-text class="pt-0">
              <div v-html="reportContent.bodyText"/>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import i18next from 'i18next'
export default {
  name: 'daily-report-page',
  data () {
    return {
      reportFetchFailed: false,
      reportContent: {
        title: null,
        bodyText: null,
        createdAt: null,
        updatedAt: null
      },
      crumbsItem: [
        {
          text: 'Top',
          disabled: false,
          to: '/'
        },
        {
          text: 'Daily Reports',
          disabled: false,
          to: '/daily_reports/posts'
        },
        {
          text: `# ${this.$route.params['id']}`,
          disabled: true,
          to: `/daily_reports/post/${this.$route.params['id']}`
        }
      ]
    }
  },
  methods: {
    async getPost () {
      await axios.get(`/v1/post/${this.$route.params['id']}`)
        .then(response => {
          this.reportFetchFailed = false
          this.$set(this.reportContent, 'title', response.data.title)
          this.$set(this.reportContent, 'bodyText', response.data.body_text)
          this.$set(this.reportContent, 'createdAt', response.data.created_at)
          this.$set(this.reportContent, 'updatedAt', response.data.updated_at)
        })
    },
    dateFormatter (date) {
      var datetime = new Date(`${date}Z`)
      var yearString = datetime.getFullYear()
      var monthString = `0${datetime.getMonth() + 1}`.slice(-2) // 0埋め
      var dateString = `0${datetime.getDate()}`.slice(-2)
      var dayString = i18next.t(`commons.dayNameShort.${datetime.getDay()}`)
      var hourString = `0${datetime.getHours()}`.slice(-2)
      var minuteString = `0${datetime.getMinutes()}`.slice(-2)
      var secondsString = `0${datetime.getSeconds()}`.slice(-2)
      var formattedTime = `${yearString}/${monthString}/${dateString} (${dayString}) ${hourString}:${minuteString}:${secondsString}`

      return formattedTime
    }
  },
  created () {
    this.getPost()
  },
  mounted () {
  }
}
</script>

<style scoped>
  .bodyContent {
    height: 100%;
    padding: 0;
  }
</style>
