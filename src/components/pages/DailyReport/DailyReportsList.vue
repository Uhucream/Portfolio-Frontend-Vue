<template>
  <v-container :fluid="isTopPage">
    <v-breadcrumbs v-if="!isTopPage" :items="crumbsItem" class="pt-1 pl-2">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-data-iterator
      :items="reportPosts"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
      no-data-text="No Posts Found"
    >
      <template v-slot:default="props">
        <v-row class="fill-height">
          <v-col
            v-for="post in props.items"
            :key="post.uuid"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-text class="pb-0">
                <div>{{ convertUtcToLocal(post.created_at) }}</div>
              </v-card-text>
              <v-card-title class="subheading font-weight-bold">
                {{ `${post.title} #${post.id}` }}
              </v-card-title>
              <v-card-text>
                <div class="text--primary cardBody">
                  {{ post.body_text }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="blue-grey lighten-1"
                  link
                  :to="`/daily_reports/post/${post.id}`"
                >
                  続きを読む
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row justify="end" align="center">
          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            :disabled="page === 1"
            fab
            dark
            icon
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            :disabled="page === numberOfPages"
            fab
            dark
            icon
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import axios from 'axios'
import i18next from 'i18next'
export default {
  name: 'dailyReportsList',
  props: ['isTopPage'],
  data () {
    return {
      itemsPerPage: 12,
      page: 1,
      sortBy: 'id',
      sortDesc: true,
      crumbsItem: [
        {
          text: 'Top',
          disabled: false,
          to: '/'
        },
        {
          text: 'Daily Reports',
          disabled: true,
          to: '/daily_reports/posts'
        }
      ],
      reportPosts: []
    }
  },
  methods: {
    switchMaxNum () {
      if (this.isXsDevice && this.$route.path !== '/daily_reports/posts') {
        this.itemsPerPage = 2
      } else if (this.$route.path === '/daily_reports/posts') {
        this.itemsPerPage = 12
      }
    },
    async getAllPosts () {
      await axios.get('/v1/posts')
        .then(response => {
          this.reportPosts.push(...response.data)
          if (this.$route.path !== '/daily_reports/posts') {
            this.$emit('postAmount', this.reportPosts.length)
          }
        }).catch(err => {
          console.error(err)
          this.reportPosts = null
          if (this.$route.path !== '/daily_reports/posts') {
            this.$emit('postAmount', this.reportPosts.length)
          }
        })
    },
    convertUtcToLocal (date) {
      console.log(date)
      var datetime = new Date(`${date}Z`)
      var yearString = datetime.getFullYear()
      var monthString = `0${datetime.getMonth() + 1}`.slice(-2) // 0埋め
      var dateString = `0${datetime.getDate()}`.slice(-2)
      var dayString = i18next.t(`commons.dayNameShort.${datetime.getDay()}`)
      var hourString = `0${datetime.getHours()}`.slice(-2)
      var minuteString = `0${datetime.getMinutes()}`.slice(-2)
      var secondsString = `0${datetime.getSeconds()}`.slice(-2)
      var formatedTime = `${yearString}/${monthString}/${dateString} (${dayString}) ${hourString}:${minuteString}:${secondsString}`
      return formatedTime
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    }
  },
  watch: {
    isXsDevice: function () {
      if (this.$route.path !== '/daily_reports/posts') {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            this.itemsPerPage = 2
            break
          case 'sm':
          case 'md':
            this.itemsPerPage = 4
            break
          case 'lg':
            this.itemsPerPage = 8
            break
        }
      } else {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            this.itemsPerPage = 4
            break
          case 'sm':
          case 'md':
          case 'lg':
            this.itemsPerPage = 12
            break
        }
      }
    }
  },
  computed: {
    isXsDevice: function () {
      return this.$vuetify.breakpoint.xs
    },
    numberOfPages () {
      return Math.ceil(this.reportPosts.length / this.itemsPerPage)
    }
  },
  created () {
    this.getAllPosts()
  },
  mounted () {
    this.switchMaxNum()
  }
}
</script>

<style scoped>
  .cardBody {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 35ch;
  }
</style>