<template>
  <v-container style="height: calc(100% - 44px)">
    <v-breadcrumbs :items="crumbsItem" class="pt-1 pl-2">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card
      class="pa-3 fill-height"
      height="100%"
      width="100%"
    >
      <v-row align-content="center">
        <v-col
          cols="12"
          sm="8"
          class="pb-0 pb-sm-4"
        >
          <v-card-title class="pb-0 pb-sm-4">
            <p class="display-1">
              {{ `#${$route.params['id']} ${reportContent.title}` }}
            </p>
          </v-card-title>
        </v-col>
        <v-col>
          <v-card-subtitle class="pt-0 pt-sm-4 ml-2 ml-sm-0">
            {{ $t('dailyReport.createdAt') }}: {{ dateFormatter(reportContent.createdAt) }}
            <div v-if="reportContent.updatedAt != reportContent.createdAt">{{ $t('dailyReport.updatedAt') }}: {{ dateFormatter(reportContent.updatedAt) }}</div>
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-divider/>
      <div
        v-html="reportContent.bodyText"
        class="text-body-1 mx-7 my-5 text-justify text-left"
      />
    </v-card>
  </v-container>
</template>

<script>
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
          text: null,
          disabled: true,
          to: `/daily_reports/post/${this.$route.params['id']}`
        }
      ]
    }
  },
  methods: {
    async fetchPost () {
      await this.$axios
        .get(`/v1/post/${this.$route.params['id']}`)
        .then(response => {
          this.reportFetchFailed = false
          this.$set(this.reportContent, 'title', response.data.title)
          this.$set(this.reportContent, 'bodyText', response.data.body_text)
          this.$set(this.reportContent, 'createdAt', response.data.created_at)
          this.$set(this.reportContent, 'updatedAt', response.data.updated_at)

          this.$set(this.crumbsItem[2], 'text', `#${this.$route.params['id']} ${response.data.title}`)
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
