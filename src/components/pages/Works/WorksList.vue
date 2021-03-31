<template>
  <component :is="conditionalTag">
    <v-breadcrumbs v-if="!isTopPage" :items="crumbsItem" class="pt-1 pl-2">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-data-iterator
      :class="{'pa-0': isTopPage && allWorksData.length != 0, 'pl-8': allWorksData.length == 0, 'py-5': allWorksData.length == 0}"
      :items="allWorksData"
      :item-key="allWorksData.uuid"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      hide-default-footer
      no-data-text="There are no works"
    >
      <template v-slot:header>
        <!-- 2021年3月末時点では、成果物数が少なすぎるのであえて検索機能を falseに -->
        <div v-if="!isTopPage && allWorksData.length != 0 && false">
          <v-btn
            text
            style="margin-bottom: 18px"
            small
            outlined
            @click="showSearch = !showSearch"
          >
            Filter works
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
                label="Search works"
              />
            </div>
          </v-expand-transition>
        </div>
      </template>

      <template v-slot:default="props">
        <v-row class="fill-height">
          <v-col
            v-for="work in props.items"
            :key="work.uuid"
            v-bind="cardsCols"
          >
            <v-card>
              <v-img
                class="white--text align-end"
                :src="workPictureURL(work.work_picture_url)"
                :lazy-src="require('@/assets/NO_IMAGE_AVAILABLE.png')"
                gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.4)"
              >
                <v-card-title>{{ work.name }}</v-card-title>
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
              <v-card-text>
                <div
                  v-html="work.top_page_outline"
                  class="text-body-1 text--primary"
                  style="padding-top: 2px"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="blue-grey lighten-1"
                  :to="`/my_work/detail/${work.endpoint_uri}`"
                >
                  詳しい情報
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <component :is="iteratorFooter" v-bind="iteratorFooterProps" v-if="allWorksData.length != 0">
          <template v-if="!isTopPage">
            <v-spacer/>
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
            <!-- 2021年3月末時点ではとりあえず作品数が1件以上あれば表示するようにする -->
            <v-btn
              v-if="allWorksData.length >= 1"
              text
              outlined
              small
              class="mt-2"
              to="/my_works"
            >
              Show {{ allWorksData.length }} works
            </v-btn>
          </template>
        </component>
      </template>
    </v-data-iterator>
  </component>
</template>

<script>
export default {
  name: 'works-list',
  props: ['isTopPage'],
  data () {
    return {
      showSearch: false,
      search: '',
      pagination: {},
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
          text: 'My Works',
          disabled: true,
          to: '/my_works'
        }
      ],
      allWorksData: []
    }
  },
  methods: {
    async fetchAllWorks () {
      await this.$axios
        .get('/v1/my_works')
        .then((response) => {
          this.allWorksData.push(...response.data)
          this.$emit('numOfWorks', this.allWorksData.length)
        })
        .catch(() => {
          this.allWorksData = []
        })
    },
    workPictureURL (url) {
      if (url) {
        return url
      } else {
        return require('@/assets/NO_IMAGE_AVAILABLE.png')
      }
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    calcRowsPerPage () {
      if (this.$route.path === '/my_works') {
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
      return Math.ceil(this.allWorksData.length / this.itemsPerPage)
    },
    conditionalTag () {
      if (this.$route.path === '/my_works') {
        return 'v-container'
      } else {
        return 'div'
      }
    },
    iteratorFooter () {
      if (this.$route.path === '/my_works') {
        return 'v-row'
      } else {
        return 'div'
      }
    },
    iteratorFooterProps () {
      if (this.$route.path === '/my_works') {
        return { align: 'center', justify: 'center' }
      } else {
        return undefined
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
    itemsPerPage () {
      if (this.$route.path === '/my_works') {
        return Math.ceil(this.rowsPerPage * this.itemsPerRow)
      } else {
        if (this.$vuetify.breakpoint.lgAndUp || this.$vuetify.breakpoint.xs) {
          return 4
        } else {
          return 3
        }
      }
    },
    cardsCols () { // 手打ちじゃないと横幅がバグる
      if (this.$route.path !== '/my_works') {
        return {
          cols: 12,
          sm: 6,
          md: this.allWorksData.length > (this.itemsPerRow - 1) ? 4 : 5,
          lg: 4,
          xl: 2
        }
      } else {
        return { cols: 12, sm: 6, md: 4, lg: 3, xl: 2 }
      }
    }
  },
  created () {
    this.fetchAllWorks()
  },
  mounted () {
    window.addEventListener('resize', this.calcRowsPerPage)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcRowsPerPage)
  }
}
</script>
