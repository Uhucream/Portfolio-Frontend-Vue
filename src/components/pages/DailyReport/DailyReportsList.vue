<template>
  <component :is="conditionalTag">

    <router-view/>

    <template v-if="$route.name !== 'DailyReportPage'">
      <DailyReportsIterator
        :isTopPage="$route.name === 'TopPage'"
      />
    </template>
  </component>
</template>

<script>
export default {
  name: 'daily-reports-list',
  components: {
    DailyReportsIterator: () => (import('@/components/modules/DailyReports/DailyReportsIterator'))
  },
  computed: {
    conditionalTag () {
      if (this.$route.path === '/daily_reports/posts') {
        return 'v-container'
      } else {
        return 'div'
      }
    }
  }
}
</script>
