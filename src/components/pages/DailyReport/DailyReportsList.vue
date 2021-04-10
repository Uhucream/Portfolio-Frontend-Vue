<template>
  <component :is="conditionalTag">
    <template v-if="!isTopPage">
      <BreadCrumbs
        :path="pagePath"
      />
    </template>

    <v-data-iterator
      v-resize="calcRowsPerPage"
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
                clearable
                solo
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
            :cols="(12 / itemsPerRow)"
          >
            <DailyReportsCard
              :report_content_data="post"
            />
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row v-if="reportPosts.length != 0" justify="center" align="center">
          <v-spacer/>
          <template v-if="!isTopPage">
            <span class="mr-4 grey--text">
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              :disabled="page === 1"
              fab
              icon
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              :disabled="page === numberOfPages"
              fab
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
              :to="{ name: 'DailyReportsList' }"
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
import DailyReportsCard from '@/components/modules/DailyReports/DailyReportsCard'
export default {
  name: 'daily-reports-list',
  components: {
    DailyReportsCard,
    BreadCrumbs: () => (import('@/components/modules/BreadCrumbs'))
  },
  props: ['isTopPage'],
  data () {
    return {
      showSearch: false,
      search: '',
      pagination: {},
      page: 1,
      sortBy: 'id',
      sortDesc: true,
      pagePath: [
        {
          text: 'Daily Reports',
          to: { name: 'DailyReportsList' }
        }
      ],
      reportPosts: []
    }
  },
  methods: {
    async fetchAllPosts () {
      await this.$axios
        .get('/v1/posts')
        .then(response => {
          this.reportPosts.push(...response.data)
        })
        .catch(_ => {
          this.reportPosts = []
        })
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    calcRowsPerPage () {
      if (this.$route.name === 'DailyReportsList') {
        let cardsContainer = document.getElementsByClassName('container')[0]
        let minItemHeight = 170

        if (cardsContainer) {
          let containerHeight = parseInt(cardsContainer.clientHeight, 0)
          this.rowsPerPage = Math.floor(Math.max(containerHeight, minItemHeight) / minItemHeight)
        } else {
          this.rowsPerPage = 3
        }
      }
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.reportPosts.length / this.itemsPerPage)
    },
    conditionalTag () {
      if (this.$route.name === 'DailyReportsList') {
        return 'v-container'
      } else {
        return 'div'
      }
    },
    itemsPerRow () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 1
        case 'sm': return 2
        case 'md': return 3
        case 'lg': return 4
        case 'xl': return 6
      }
    },
    rowsPerPage: {
      get: function () {
        return 4
      },
      set: function (newValue) {
        return newValue
      }
    },
    itemsPerPage: {
      get: function () {
        if (this.$route.name === 'DailyReportsList') {
          return Math.ceil(this.rowsPerPage * this.itemsPerRow)
        } else {
          if (this.$vuetify.breakpoint.xs) {
            return 4
          } else {
            return this.itemsPerRow * 2
          }
        }
      },
      set: function (newValue) {
        return newValue
      }
    }
  },
  created () {
    this.fetchAllPosts()
  }
}
</script>
