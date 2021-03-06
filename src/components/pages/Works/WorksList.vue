<template>
  <component :is="conditionalTag">
    <template v-if="!isTopPage">
      <BreadCrumbs
        :path="pathList"
      />
    </template>

    <v-data-iterator
      v-resize="calcRowsPerPage"
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
            :cols="cardsCols"
          >
            <WorksCard
              :work_detail_data="work"
            />
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row v-if="allWorksData.length != 0 && !isTopPage" justify="center" align="center">
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
        </v-row>
      </template>
    </v-data-iterator>

    <v-row v-if="isTopPage && allWorksData.length >= 1" align="center" justify="center">
      <v-spacer/>
      <v-btn
        text
        outlined
        small
        class="mt-5 mr-4"
        :to="{ name: 'WorksList' }"
      >
        Show {{ allWorksData.length }} works
      </v-btn>
    </v-row>
  </component>
</template>

<script>
import WorksCard from '@/components/modules/Works/WorksCard'
export default {
  name: 'works-list',
  props: ['isTopPage', 'isSameRow'],
  components: {
    WorksCard,
    BreadCrumbs: () => (import('@/components/modules/BreadCrumbs'))
  },
  data () {
    return {
      showSearch: false,
      search: '',
      pagination: {},
      page: 1,
      sortBy: 'id',
      sortDesc: true,
      pathList: [
        {
          text: 'My Works',
          to: { name: 'WorksList' }
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
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    calcRowsPerPage () {
      if (this.$route.name === 'WorksList') {
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
      if (this.$route.name === 'WorksList') {
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
        if (this.$route.name === 'WorksList') {
          return Math.ceil(this.rowsPerPage * this.itemsPerRow)
        } else {
          if (this.$vuetify.breakpoint.xs) {
            return 4
          } else {
            return this.itemsPerRow
          }
        }
      },
      set: function (newValue) {
        return newValue
      }
    },
    cardsCols () {
      if (this.$route.name === 'WorksList' || !this.isSameRow) {
        return 12 / this.itemsPerRow
      } else {
        return 12 / this.allWorksData.length
      }
    }
  },
  created () {
    this.fetchAllWorks()
  }
}
</script>
