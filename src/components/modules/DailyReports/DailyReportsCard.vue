<template functional>
  <v-card>
    <v-card-subtitle class="pb-0">
      {{ $options.dateFormatter(props.created_at) }}
    </v-card-subtitle>
    <v-card-title>
      {{ `#${props.id} ${props.title}` }}
    </v-card-title>
    <v-card-text
      class="text--primary text-truncate d-inline-block"
      style="max-width: 180px"
    >
      {{ $options.removeHtmlTag(props.body_text) }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="blue-grey lighten-1"
        link
        :to="`/daily_reports/post/${props.id}`"
      >
        {{ $options.translate('dailyReport.readMore') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import i18next from 'i18next'
export default {
  name: 'daily-reports-card',
  props: {
    id: Number,
    title: String,
    body_text: String,
    created_at: String
  },
  translate (str) { // 関数型コンポーネントコンポーネントである関係上、$t関数が使えないので定義
    return i18next.t(str)
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
  },
  removeHtmlTag (txt) {
    if (txt != null && txt.match(/<("[^"]*"|'[^']*'|[^'">])*>/g)) {
      return txt.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
    } else {
      return txt
    }
  }
}
</script>
