<template functional>
  <v-container style="height: calc(100% - 44px)">
    <v-breadcrumbs :items="$options.crumbsItem(props)" class="pt-1 pl-2">
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
              {{ `#${props.report_content_data.id} ${props.report_content_data.title}` }}
            </p>
          </v-card-title>
        </v-col>
        <v-col>
          <v-card-subtitle class="pt-0 pt-sm-4 ml-2 ml-sm-0">
            {{ $options.translate('dailyReport.createdAt') }}: {{ $options.dateFormatter(props.report_content_data.created_at) }}
            <div v-if="props.report_content_data.updated_at != props.report_content_data.created_at">{{ $options.translate('dailyReport.updatedAt') }}: {{ $options.dateFormatter(props.report_content_data.updated_at) }}</div>
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-divider/>
      <div
        v-html="props.report_content_data.body_text"
        class="text-body-1 mx-7 my-5 text-justify text-left"
      />
    </v-card>
  </v-container>
</template>

<script>
import i18next from 'i18next'
export default {
  name: 'daily-report-page',
  props: {
    report_content_data: Object
  },
  translate (str) { // 関数型コンポーネントコンポーネントである関係上、$t関数が使えないので定義
    return i18next.t(str)
  },
  crumbsItem (props) {
    return [
      {
        text: 'Top',
        link: true,
        exact: true,
        disabled: false,
        to: { name: 'TopPage' }
      },
      {
        text: 'Daily Reports',
        link: true,
        exact: true,
        disabled: false,
        to: { name: 'DailyReportsList' }
      },
      {
        text: `#${props.report_content_data.id} ${props.report_content_data.title}`,
        link: true,
        exact: true,
        disabled: true,
        to: {
          name: 'DailyReportPage',
          params: {
            id: props.report_content_data.id
          }
        }
      }
    ]
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
}
</script>

<style scoped>
  .bodyContent {
    height: 100%;
    padding: 0;
  }
</style>
