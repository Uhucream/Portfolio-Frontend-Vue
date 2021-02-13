<template>
  <component :is="dynamicComponent">
    <v-breadcrumbs v-if="!isTopPage" :items="crumbsItem" class="pt-1 pl-2">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-data-iterator
      :class="{'pa-0': isTopPage && reportPosts.length != 0, 'pl-8': reportPosts.length == 0, 'py-5': reportPosts.length == 0}"
      :items="reportPosts"
      :item-key="reportPosts.uuid"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
      no-data-text="No Posts Found"
    >
      <template v-slot:header>
        <div v-if="!isTopPage && reportPosts.length != 0">
          <v-btn
            text
            style="margin-bottom: 18px"
            small
            outlined
            @click="showSearch = !showSearch"
          >
            Filter daily reports
            <v-icon>{{ showSearch ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <v-expand-transition>
            <div v-show="showSearch">
              <v-text-field
                v-model="search"
                dark
                clearable
                flat
                solo-inverted
                hide-details
                color="light-blue accent-4"
                class="px-4"
                style="padding-bottom: 18px"
                prepend-inner-icon="mdi-magnify"
                label="Search posts"
              ></v-text-field>
            </div>
          </v-expand-transition>
        </div>
      </template>
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
                  {{ $t('dailyReport.readMore') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row v-if="reportPosts.length != 0" justify="end" align="center">
          <template v-if="!isTopPage">
            <span class="mr-4 grey--text">
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
          </template>
          <template v-else>
            <v-btn
              v-if="reportPosts.length > itemsPerPage"
              text
              outlined
              small
              class="mt-2 mr-4"
              to="/daily_reports/posts"
            >
              Show {{ reportPosts.length }} posts
            </v-btn>
          </template>
        </v-row>
      </template>
    </v-data-iterator>
  </component>
</template>

<script>
import axios from 'axios'
import i18next from 'i18next'
export default {
  name: 'daily-reports-list',
  props: ['isTopPage'],
  data () {
    return {
      currentPage: this.$route.path,
      showSearch: false,
      search: '',
      pagination: {},
      itemsPerPage: 4,
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
      } else if (this.$route.path === '') {
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
      }
    },
    async getAllPosts () {
      await axios.get('/v1/posts')
        .then(response => {
          this.reportPosts.push(...response.data)
        }).catch(err => {
          console.error(err)
          this.reportPosts = null
        })
    },
    convertUtcToLocal (date) {
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
    },
    dynamicComponent () {
      if (this.$route.path === '/daily_reports/posts') {
        return 'v-container'
      } else {
        return 'div'
      }
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
